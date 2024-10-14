import { PartialType } from '@nestjs/swagger';
import { CreateKeywordAnalysisDto } from './create-keyword-analysis.dto';

export class UpdateKeywordAnalysisDto extends PartialType(
  CreateKeywordAnalysisDto,
) {}
