import { Injectable } from '@nestjs/common';
import { Prisma, KeywordAnalysis, Competitor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class KeywordAnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new KeywordAnalysis with competitors
  async createKeywordAnalysis(
    data: Prisma.KeywordAnalysisCreateInput,
  ): Promise<KeywordAnalysis> {
    return this.prisma.keywordAnalysis.create({
      data,
    });
  }

  // Fetch all KeywordAnalyses with competitors
  async getAllKeywordAnalyses(): Promise<KeywordAnalysis[]> {
    return this.prisma.keywordAnalysis.findMany({
      include: {
        competitors: true,
      },
    });
  }

  // Fetch a single KeywordAnalysis by ID
  async getKeywordAnalysisById(id: string): Promise<KeywordAnalysis | null> {
    return this.prisma.keywordAnalysis.findUnique({
      where: { id },
      include: {
        competitors: true,
      },
    });
  }

  // Update a KeywordAnalysis by ID
  async updateKeywordAnalysis(
    id: string,
    data: Prisma.KeywordAnalysisUpdateInput,
  ): Promise<KeywordAnalysis> {
    return this.prisma.keywordAnalysis.update({
      where: { id },
      data,
    });
  }

  // Delete a KeywordAnalysis by ID
  async deleteKeywordAnalysis(id: string): Promise<KeywordAnalysis> {
    return this.prisma.keywordAnalysis.delete({
      where: { id },
    });
  }

  // Create a competitor entry linked to a KeywordAnalysis
  async createCompetitor(
    analysisId: string,
    competitorUrl: string,
    keywords: string[],
  ): Promise<Competitor> {
    return this.prisma.competitor.create({
      data: {
        competitorUrl,
        keywords,
        keywordAnalysis: {
          connect: { id: analysisId },
        },
      },
    });
  }

  // Fetch all competitors for a given analysis ID
  async getCompetitorsByAnalysisId(analysisId: string): Promise<Competitor[]> {
    return this.prisma.competitor.findMany({
      where: { analysisId },
    });
  }
}
