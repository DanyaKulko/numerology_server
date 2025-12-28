import puppeteer, {Browser} from 'puppeteer';
import {PDFDocument} from 'pdf-lib';

let browserInstance: Browser | null = null;

async function getBrowser() {
    if (!browserInstance) {
        browserInstance = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
            headless: true,
            dumpio: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu',
                '--hide-scrollbars',
                '--no-first-run',
                '--disable-crash-reporter',
                '--disable-breakpad',
                '--disable-software-rasterizer',
                '--user-data-dir=/tmp/puppeteer_user_data',
                '--crash-dumps-dir=/tmp'
            ]
        });
    }
    return browserInstance;
}

export const PdfRenderer = {
    async renderHtml(html: string, landscape: boolean): Promise<Buffer> {
        const browser = await getBrowser();
        const page = await browser.newPage();
        try {
            await page.setViewport({
                width: landscape ? 1123 : 794,
                height: landscape ? 794 : 1123,
                deviceScaleFactor: 2,
                isMobile: false
            });
            await page.setContent(html, {waitUntil: 'networkidle0', timeout: 60000});
            const buffer = await page.pdf({
                // format: 'A4',
                landscape: landscape,
                printBackground: true,
                preferCSSPageSize: true,
                margin: {top: 0, bottom: 0, left: 0, right: 0},
                width: landscape ? '297mm' : '210mm',
                height: landscape ? '210mm' : '297mm',
            });
            console.log("PDF rendered, size:", buffer.length);
            return Buffer.from(buffer);
        } catch (e) {
            console.error("PDF Rendering Error:", e);
            throw e;
        } finally {
            await page.close();
        }
    },

    async mergePdfs(buffers: Buffer[]): Promise<Buffer> {
        if (buffers.length === 0) throw new Error("No PDFs to merge");
        if (buffers.length === 1) return buffers[0];

        const mergedPdf = await PDFDocument.create();

        for (const buffer of buffers) {
            const pdf = await PDFDocument.load(buffer);
            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach(page => mergedPdf.addPage(page));
        }

        const saved = await mergedPdf.save();
        return Buffer.from(saved);
    }
};
