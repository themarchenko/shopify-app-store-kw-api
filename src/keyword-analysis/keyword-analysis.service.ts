import { Injectable } from '@nestjs/common';
import { KeywordAnalysis } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateKeywordAnalysisDto } from './dto/create-keyword-analysis.dto';
import { UpdateKeywordAnalysisDto } from './dto/update-keyword-analysis.dto';

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
}
