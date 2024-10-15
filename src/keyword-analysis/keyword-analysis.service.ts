import { Injectable } from '@nestjs/common';
import { KeywordAnalysis } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateKeywordAnalysisDto } from './dto/create-keyword-analysis.dto';
import { UpdateKeywordAnalysisDto } from './dto/update-keyword-analysis.dto';
import { KeywordAnalysisResponseDto } from './dto/keyword-analysis-response.dto';
import { PotentialKeyword } from './types';

@Injectable()
export class KeywordAnalysisService {
  constructor(private readonly prisma: PrismaService) {}

  async createKeywordAnalysis(
    data: CreateKeywordAnalysisDto,
  ): Promise<KeywordAnalysis> {
    // Transform competitors into the correct Prisma format
    const competitors = data.competitors?.map((competitor) => ({
      competitorUrl: competitor.competitorUrl,
      keywords: competitor.keywords,
    }));

    return this.prisma.keywordAnalysis.create({
      data: {
        searchPhrase: data.searchPhrase,
        appUrl: data.appUrl,
        keywords: data.keywords,
        competitors: {
          create: competitors, // Create nested competitors
        },
      },
      include: { competitors: true },
    });
  }

  async updateKeywordAnalysis(
    id: string,
    data: UpdateKeywordAnalysisDto,
  ): Promise<KeywordAnalysis> {
    // Transform competitors into the correct Prisma format
    const competitors = data.competitors?.map((competitor) => ({
      competitorUrl: competitor.competitorUrl,
      keywords: competitor.keywords,
    }));

    return this.prisma.keywordAnalysis.update({
      where: {
        id,
      },
      data: {
        searchPhrase: data.searchPhrase,
        appUrl: data.appUrl,
        keywords: data.keywords,
        competitors: {
          create: competitors, // Create nested competitors
        },
      },
      include: { competitors: true },
    });
  }

  async getKeywordAnalysisById(id: string): Promise<KeywordAnalysis | null> {
    return this.prisma.keywordAnalysis.findUnique({
      where: { id },
      include: { competitors: true },
    });
  }

  getPotentialKeywords({
    competitors,
    keywords,
  }: KeywordAnalysisResponseDto): PotentialKeyword[] {
    const competitorKeywords = competitors.map(
      (competitor) => competitor.keywords,
    );

    // Flatten competitor keywords into a single array
    const allCompetitorKeywords = competitorKeywords.flat();

    // Create a frequency map of competitor keywords
    const keywordFrequency: Record<string, number> = {};
    allCompetitorKeywords.forEach((keyword) => {
      keywordFrequency[keyword] = (keywordFrequency[keyword] || 0) + 1;
    });

    // Filter already used keywords
    const newKeywords = Object.keys(keywordFrequency).filter(
      (keyword) => !keywords.includes(keyword),
    );

    // Map new keywords to their usage scores
    const keywordScores: PotentialKeyword[] = newKeywords.map((keyword) => ({
      keyword,
      score: keywordFrequency[keyword],
    }));

    // Sort by score in descending order (higher usage first)
    return keywordScores.sort((a, b) => b.score - a.score);
  }
}
