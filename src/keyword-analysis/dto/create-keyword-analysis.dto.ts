import { IsString, IsArray, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCompetitorDto } from './create-competitor.dto'; // Competitor DTO

export class CreateKeywordAnalysisDto {
  @ApiProperty({
    example: 'booking apps',
    description: 'Search phrase used for the analysis',
  })
  @IsString()
  searchPhrase: string;

  @ApiProperty({
    example: 'https://apps.shopify.com/sesami',
    description: 'URL of the app being analyzed',
  })
  @IsUrl()
  appUrl: string;

  @ApiProperty({
    example: ['keyword1', 'keyword2'],
    description: 'List of keywords associated with the target app',
  })
  @IsArray()
  @IsString({ each: true })
  keywords: string[];

  @ApiProperty({
    type: [CreateCompetitorDto],
    description: 'Competitor data with their URLs and keywords',
    required: false,
  })
  @IsOptional()
  @IsArray()
  competitors?: CreateCompetitorDto[];
}
