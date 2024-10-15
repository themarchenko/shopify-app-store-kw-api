import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PotentialKeywordDto {
  @ApiProperty({
    example: 'competitorKeyword1',
    description:
      'Potential keyword which used by competitor but not target app',
  })
  @IsString()
  keyword: string;

  @ApiProperty({
    example: 1,
    description: 'Score level',
  })
  @IsInt()
  score: number;
}
