-- CreateTable
CREATE TABLE "KeywordAnalysis" (
    "id" TEXT NOT NULL,
    "searchPhrase" TEXT NOT NULL,
    "appUrl" TEXT NOT NULL,
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeywordAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Competitor" (
    "id" TEXT NOT NULL,
    "keywords" TEXT[],
    "competitorUrl" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,

    CONSTRAINT "Competitor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "KeywordAnalysis_searchPhrase_idx" ON "KeywordAnalysis"("searchPhrase");

-- AddForeignKey
ALTER TABLE "Competitor" ADD CONSTRAINT "Competitor_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "KeywordAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
