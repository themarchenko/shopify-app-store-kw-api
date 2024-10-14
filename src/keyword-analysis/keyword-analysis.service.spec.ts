import { Test, TestingModule } from '@nestjs/testing';
import { KeywordAnalysisService } from './keyword-analysis.service';

describe('KeywordAnalysisService', () => {
  let service: KeywordAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KeywordAnalysisService],
    }).compile();

    service = module.get<KeywordAnalysisService>(KeywordAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
