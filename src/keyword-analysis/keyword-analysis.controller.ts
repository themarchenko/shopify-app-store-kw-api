import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { KeywordAnalysisService } from './keyword-analysis.service';
import { CreateKeywordAnalysisDto } from './dto/create-keyword-analysis.dto';
import { UpdateKeywordAnalysisDto } from './dto/update-keyword-analysis.dto';
import { KeywordAnalysisResponseDto } from './dto/keyword-analysis-response.dto';

@ApiTags('Keyword Analysis')
@Controller('keyword-analysis')
export class KeywordAnalysisController {
  constructor(
    private readonly keywordAnalysisService: KeywordAnalysisService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new keyword analysis' })
  @ApiBody({
    description: 'Data required to create a keyword analysis',
    type: CreateKeywordAnalysisDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The newly created keyword analysis',
    type: KeywordAnalysisResponseDto,
  })
  async create(
    @Body() createKeywordAnalysisDto: CreateKeywordAnalysisDto,
  ): Promise<KeywordAnalysisResponseDto> {
    const result = await this.keywordAnalysisService.createKeywordAnalysis(
      createKeywordAnalysisDto,
    );
    return result as KeywordAnalysisResponseDto;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a keyword analysis by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the keyword analysis',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'The requested keyword analysis',
    type: KeywordAnalysisResponseDto,
  })
  async findOne(
    @Param('id') id: string,
  ): Promise<KeywordAnalysisResponseDto | null> {
    return (await this.keywordAnalysisService.getKeywordAnalysisById(
      id,
    )) as KeywordAnalysisResponseDto | null;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a keyword analysis' })
  @ApiParam({
    name: 'id',
    description: 'ID of the keyword analysis to update',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    description: 'Data for updating the keyword analysis',
    type: UpdateKeywordAnalysisDto,
  })
  @ApiResponse({
    status: 200,
    description: 'The updated keyword analysis',
    type: KeywordAnalysisResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() updateKeywordAnalysisDto: UpdateKeywordAnalysisDto,
  ): Promise<KeywordAnalysisResponseDto> {
    const result = await this.keywordAnalysisService.updateKeywordAnalysis(
      id,
      updateKeywordAnalysisDto,
    );
    return result as KeywordAnalysisResponseDto;
  }
}
