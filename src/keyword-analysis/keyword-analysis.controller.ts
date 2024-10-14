import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { Prisma, KeywordAnalysis } from '@prisma/client';

import { KeywordAnalysisService } from './keyword-analysis.service';

@Controller('keyword-analysis')
export class KeywordAnalysisController {
  constructor(
    private readonly keywordAnalysisService: KeywordAnalysisService,
  ) {}

  @Post()
  async create(
    @Body() createKeywordAnalysisDto: Prisma.KeywordAnalysisCreateInput,
  ): Promise<KeywordAnalysis> {
    return this.keywordAnalysisService.createKeywordAnalysis(
      createKeywordAnalysisDto,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<KeywordAnalysis | null> {
    return this.keywordAnalysisService.getKeywordAnalysisById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateKeywordAnalysisDto: Prisma.KeywordAnalysisUpdateInput,
  ): Promise<KeywordAnalysis> {
    return this.keywordAnalysisService.updateKeywordAnalysis(
      id,
      updateKeywordAnalysisDto,
    );
  }
}
