import fs from 'fs/promises';
import path from 'path';
import handlebars from 'handlebars';
import {PdfRenderer} from "./PdfRenderer";
import {calculateMatrix} from "../../../utils/matrixCalculator";
import {getReportData, MatrixCategoryType} from "../../../utils/dataFetcher";
import {generalMatrixTranslations} from "./pdfGenerator.constants";
import {Language} from "../../admin/admin.types";

export interface GeneratorOptions {
    data: any;
    translations: any;
    lang: string;
}

export interface MatrixGenerationParams {
    day: string | number;
    month: string | number;
    year: string | number;
    lang: Language;
    matrixCategory: MatrixCategoryType;
    partnerDate?: {
        day: string | number;
        month: string | number;
        year: string | number;
    } | null;
}

export abstract class AbstractMatrixGenerator {
    protected imagesDir = path.join(process.cwd(), 'templates', 'images');
    protected templatesBaseDir = path.join(process.cwd(), 'templates', 'matrix');

    protected abstract getTemplateFolder(): string;

    protected abstract prepareContext(opts: GeneratorOptions): Promise<any>;

    public async generateSummary(params: MatrixGenerationParams): Promise<Buffer> {
        const { day, month, year, lang, matrixCategory, partnerDate } = params;

        const matrix = calculateMatrix({day, month, year, type: matrixCategory, partnerDate});
        const reportData = await getReportData(matrix, lang, matrixCategory);

        const translations = generalMatrixTranslations[lang] || generalMatrixTranslations['FI'];

        const context = await this.prepareContext({data: reportData, translations, lang});
        const commonAssets = await this.getCommonAssets();

        const html = await this.renderTemplate('matrix_page', {...context, ...commonAssets});

        return PdfRenderer.renderHtml(html, true);
    }

    public async generateFull(params: MatrixGenerationParams): Promise<Buffer> {
        const { day, month, year, lang, matrixCategory, partnerDate } = params;

        const matrix = calculateMatrix({day, month, year, type: matrixCategory, partnerDate});

        const reportData = await getReportData(matrix, lang, matrixCategory);
        const translations = generalMatrixTranslations[lang] || generalMatrixTranslations['FI'];

        const context = await this.prepareContext({data: reportData, translations, lang});
        const commonAssets = await this.getCommonAssets();

        const [matrixHtml, contentHtml] = await Promise.all([
            this.renderTemplate('matrix_page', {...context, ...commonAssets}),
            this.renderTemplate('content', {...context, ...commonAssets})
        ]);

        const [matrixPdf, contentPdf] = await Promise.all([
            PdfRenderer.renderHtml(matrixHtml, true),
            PdfRenderer.renderHtml(contentHtml, false)
        ]);

        return PdfRenderer.mergePdfs([matrixPdf, contentPdf]);
    }

    protected async renderTemplate(templateType: 'matrix_page' | 'content', data: any): Promise<string> {
        const folder = this.getTemplateFolder();
        const filename = `${folder}_${templateType}.hbs`;
        const filePath = path.join(this.templatesBaseDir, folder, filename);

        try {
            const source = await fs.readFile(filePath, 'utf8');
            const template = handlebars.compile(source);
            return template(data);
        } catch (e) {
            console.error(`Error loading template: ${filePath}`, e);
            throw new Error(`Template not found: ${filename}`);
        }
    }

    protected async getImageBase64(filename: string): Promise<string> {
        try {
            const filePath = path.join(this.imagesDir, filename);
            const bitmap = await fs.readFile(filePath);
            const ext = path.extname(filename).toLowerCase();
            const mime = ext === '.svg' ? 'image/svg+xml' :
                ext === '.png' ? 'image/png' :
                    'image/jpeg';
            return `data:${mime};base64,${bitmap.toString('base64')}`;
        } catch {
            return '';
        }
    }

    private async getCommonAssets() {
        const [background, matrixImg, compatibilityImg, watermark, triad] = await Promise.all([
            this.getImageBase64('background.jpg'),
            this.getImageBase64('matrix_main.png'),
            this.getImageBase64('matrix_compatibility.png'),
            this.getImageBase64('watermark.png'),
            this.getImageBase64('triad.png'),
        ]);
        return {background, image: matrixImg, watermark, triad, compatibilityImg};
    }
}
