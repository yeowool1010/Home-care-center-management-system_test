// src/types/report.ts
export interface Report {
  id: number;
  member_id: string;
  birth: string;
  record_date: string;
  record_5th: object;
  first_record: object;
  comment: string;
  status: string;
  center: string;
}
