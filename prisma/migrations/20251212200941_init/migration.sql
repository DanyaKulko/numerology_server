-- CreateEnum
CREATE TYPE "Language" AS ENUM ('RU', 'EN', 'FI');

-- CreateEnum
CREATE TYPE "MatrixType" AS ENUM ('GENERAL', 'FINANCE', 'COMPATIBILITY', 'CHILD');

-- CreateTable
CREATE TABLE "MatrixCategory" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "MatrixType" NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatrixCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryTranslation" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "CategoryTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatrixPosition" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MatrixPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PositionTranslation" (
    "id" SERIAL NOT NULL,
    "positionId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "PositionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interpretation" (
    "id" SERIAL NOT NULL,
    "positionId" INTEGER NOT NULL,
    "arcana" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "title" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interpretation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatrixCategory_slug_key" ON "MatrixCategory"("slug");

-- CreateIndex
CREATE INDEX "MatrixCategory_type_idx" ON "MatrixCategory"("type");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTranslation_categoryId_language_key" ON "CategoryTranslation"("categoryId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "MatrixPosition_slug_key" ON "MatrixPosition"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "PositionTranslation_positionId_language_key" ON "PositionTranslation"("positionId", "language");

-- CreateIndex
CREATE INDEX "Interpretation_positionId_language_idx" ON "Interpretation"("positionId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Interpretation_positionId_arcana_language_key" ON "Interpretation"("positionId", "arcana", "language");

-- AddForeignKey
ALTER TABLE "CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MatrixCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatrixPosition" ADD CONSTRAINT "MatrixPosition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MatrixCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PositionTranslation" ADD CONSTRAINT "PositionTranslation_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "MatrixPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interpretation" ADD CONSTRAINT "Interpretation_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "MatrixPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
