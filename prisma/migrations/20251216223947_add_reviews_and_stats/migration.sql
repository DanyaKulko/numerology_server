-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "avatarUrl" TEXT,
    "isShow" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewTranslation" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "language" "Language" NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "ReviewTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statistic" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "labels" JSONB NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReviewTranslation_reviewId_language_key" ON "ReviewTranslation"("reviewId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Statistic_key_key" ON "Statistic"("key");

-- AddForeignKey
ALTER TABLE "ReviewTranslation" ADD CONSTRAINT "ReviewTranslation_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
