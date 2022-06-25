import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportType } from '../data';
import { ReportService } from './report.service';
import { CreateReportDto, ReportResponse, UpdateReportDto } from '../dtos/report.dto';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponse[] {
    const reportType = type === 'income' ? ReportType.INCOME : type === 'expense' ? ReportType.EXPENSE : null;

    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string): ReportResponse {
    const reportType = type === 'income' ? ReportType.INCOME : type === 'expense' ? ReportType.EXPENSE : null;

    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  // createReport(@Body() body: { amount: number; source: string }) {
  createReport(@Body() { amount, source }: CreateReportDto, @Param('type', new ParseEnumPipe(ReportType)) type: string): ReportResponse {
    const reportType = type === 'income' ? ReportType.INCOME : type === 'expense' ? ReportType.EXPENSE : null;

    return this.reportService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateReportDto): ReportResponse {
    const reportType = type === 'income' ? ReportType.INCOME : type === 'expense' ? ReportType.EXPENSE : null;

    return this.reportService.updateReportById(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = type === 'income' ? ReportType.INCOME : type === 'expense' ? ReportType.EXPENSE : null;

    return this.deleteReport(reportType, id);
  }
}
