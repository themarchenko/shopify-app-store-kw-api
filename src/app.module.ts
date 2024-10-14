import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { KeywordAnalysisModule } from './keyword-analysis/keyword-analysis.module';

@Module({
  imports: [KeywordAnalysisModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
