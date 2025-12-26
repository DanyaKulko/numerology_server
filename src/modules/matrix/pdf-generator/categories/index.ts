import { MatrixType } from '@prisma/client';
import { AbstractMatrixGenerator } from '../AbstractMatrixGenerator';
import PrognosisMatrixGenerator from './PrognosisMatrixGenerator';
import GeneralMatrixGenerator from "./GeneralMatrixGenerator";
import ChildMatrixGenerator from "./ChildMatrixGenerator";
import CompatibilityMatrixGenerator from "./CompatibilityMatrixGenerator";

export class MatrixGeneratorFactory {
    static getGenerator(type: MatrixType): AbstractMatrixGenerator {
        switch (type) {
            case MatrixType.GENERAL:
                return GeneralMatrixGenerator;
            case MatrixType.CHILD:
                return ChildMatrixGenerator;
            case MatrixType.COMPATIBILITY:
                return CompatibilityMatrixGenerator;
            case MatrixType.PROGNOSIS:
                return PrognosisMatrixGenerator;
            case MatrixType.FINANCE:
            default:
                return GeneralMatrixGenerator;
        }
    }
}
