-- CreateTable
CREATE TABLE "MatrixProgram" (
    "id" SERIAL NOT NULL,
    "type" "MatrixType" NOT NULL,
    "m1" INTEGER NOT NULL,
    "m2" INTEGER NOT NULL,
    "m3" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatrixProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramTranslation" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "ProgramTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatrixProgram_type_m1_m2_m3_key" ON "MatrixProgram"("type", "m1", "m2", "m3");

-- CreateIndex
CREATE UNIQUE INDEX "ProgramTranslation_programId_language_key" ON "ProgramTranslation"("programId", "language");

-- AddForeignKey
ALTER TABLE "ProgramTranslation" ADD CONSTRAINT "ProgramTranslation_programId_fkey" FOREIGN KEY ("programId") REFERENCES "MatrixProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
