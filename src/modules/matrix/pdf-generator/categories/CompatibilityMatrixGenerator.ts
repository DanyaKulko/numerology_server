import {AbstractMatrixGenerator, GeneratorOptions} from "../AbstractMatrixGenerator";

class CompatibilityMatrixGenerator extends AbstractMatrixGenerator {
    protected getTemplateFolder(): string {
        return 'compatibility';
    }

    protected async prepareContext(opts: GeneratorOptions): Promise<any> {
        const { data, translations } = opts;

        //@ts-ignore
        console.log(data.matrix.firstMatrix)
        console.log(data.matrix.secondMatrix)
        console.log(data.matrix.compatibilityMatrix)

        const pill = await  this.getImageBase64(`pill.png`);

        return {
            ...data,
            firstMatrix: data.matrix.firstMatrix,
            secondMatrix: data.matrix.secondMatrix,
            compatibilityMatrix: data.matrix.compatibilityMatrix,
            translations,
            pill
        };
    }
}

export default new CompatibilityMatrixGenerator();
