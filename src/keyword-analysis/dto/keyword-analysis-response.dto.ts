import { ApiProperty } from '@nestjs/swagger';
import { Competitor } from '@prisma/client';
import { CreateCompetitorDto } from './create-competitor.dto';

export class KeywordAnalysisResponseDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique ID of the analysis',
  })
  id: string;

  @ApiProperty({
    example: 'booking apps',
    description: 'Search phrase used for analysis',
  })
  searchPhrase: string;

  @ApiProperty({
    example: 'https://apps.shopify.com/sesami',
    description: 'URL of the app being analyzed',
  })
  appUrl: string;

  @ApiProperty({
    example: ['keyword1', 'keyword2'],
    description: 'Keywords associated with the app',
  })
  keywords: string[];

  @ApiProperty({
    type: () => [CreateCompetitorDto],
    description: 'List of competitors',
  })
  competitors: Competitor[];

  @ApiProperty({
    example: '2024-01-01T12:00:00.000Z',
    description: 'Creation timestamp',
  })
  createdAt: Date;
}
