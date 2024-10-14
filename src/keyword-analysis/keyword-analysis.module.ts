import { Module } from '@nestjs/common';
import { KeywordAnalysisService } from './keyword-analysis.service';
import { KeywordAnalysisController } from './keyword-analysis.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [KeywordAnalysisController],
  providers: [KeywordAnalysisService, PrismaService],
})
export class KeywordAnalysisModule {}
