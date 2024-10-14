import { IsArray, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompetitorDto {
  @ApiProperty({
    example: 'https://apps.shopify.com/appointo-appointments-and-bookings',
    description: 'Competitor URL',
  })
  @IsUrl()
  competitorUrl: string;

  @ApiProperty({
    example: ['competitorKeyword1', 'competitorKeyword2'],
    description: 'Keywords used by the competitor',
  })
  @IsArray()
  @IsString({ each: true })
  keywords: string[];
}
