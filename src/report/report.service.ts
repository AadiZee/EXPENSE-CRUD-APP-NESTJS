import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ReportType, data } from '../data';
import { ReportResponse } from '../dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponse[] {
    return data.report
      .filter((report) => {
        return report.type === type;
      })
      .map((report) => new ReportResponse(report));
  }

  getReportById(type: ReportType, id: string): ReportResponse {
    const report = data.report
      .filter((report) => {
        return report.type === type;
      })
      .find((report) => {
        return report.id === id;
      });

    if (!report) return;

    return new ReportResponse(report);
  }

  // createReport(type: ReportType, data: Report) {
  createReport(type: ReportType, { amount, source }: Report): ReportResponse {
    const newReport = {
      id: uuid(),
      source: source,
      amount: amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponse(newReport);
  }

  updateReportById(type: ReportType, id: string, body: UpdateReport): ReportResponse {
    const reportToUpdate = data.report.filter((report) => report.type === type).find((report) => report.id === id);

    const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return new ReportResponse(data.report[reportIndex]);
  }

  deleteReport(type: ReportType, id: string) {
    if (type !== null) {
      const reportIndex = data.report.findIndex((report) => report.id === id);

      if (reportIndex === -1) return { status: 400, message: 'No Record exists for provided id!' };

      data.report.splice(reportIndex, 1);

      return { status: 204, message: 'Record Deleted Successfully!' };
    } else if (type === null) {
      return { status: 400, message: 'INVALID URL' };
    } else {
      return { status: 400, message: 'There was a problem processing the request' };
    }
  }
}
