import {AbstractMatrixGenerator, GeneratorOptions} from "../AbstractMatrixGenerator";

class GeneralMatrixGenerator extends AbstractMatrixGenerator {

    protected getTemplateFolder(): string {
        return 'general';
    }

    protected async prepareContext(opts: GeneratorOptions): Promise<any> {
        const { data, translations } = opts;

        const chakraIcons = await this.loadChakraIcons();
        const chakraRows = this.buildChakraRows(chakraIcons, translations, data.matrix);

        const pill = await  this.getImageBase64(`pill.png`);
        return {
            ...data,
            numbers: data.matrix,
            chakraRows,
            translations,
            pill
        };
    }

    private async loadChakraIcons() {
        const names = ['sahasrara', 'ajna', 'vishuddha', 'anahata', 'manipura', 'svadhisthana', 'muladhara'];
        const icons: Record<string, string> = {};
        await Promise.all(names.map(async name => {
            icons[name] = await this.getImageBase64(`chakras/${name}.png`);
        }));
        return icons;
    }

    private buildChakraRows(icons: any, translations: any, numbers: any) {
        const config = [
            { k: 'sahasrara', c: "#ffe6e6" }, { k: 'ajna', c: "#ffeedd" },
            { k: 'vishuddha', c: "#fff8e6" }, { k: 'anahata', c: "#e6ffe6" },
            { k: 'manipura', c: "#e6f7ff" }, { k: 'svadhisthana', c: "#e6f0ff" },
            { k: 'muladhara', c: "#f3e6ff" }
        ];

        return config.slice().reverse().map((item, idx) => {
            const n = 7 - idx;
            return {
                chakra: {
                    name: translations.calculator.rows[item.k],
                    color: item.c,
                    icon: icons[item.k]
                },
                o: numbers[`o${n}`] ?? 0,
                p: numbers[`p${n}`] ?? 0,
                q: numbers[`q${n}`] ?? 0,
            };
        });
    }
}

export default new GeneralMatrixGenerator();
