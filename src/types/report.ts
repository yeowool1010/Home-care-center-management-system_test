// src/types/report.ts
export interface Report {
  id: number;
  member_id: string;
  birth: string;
  record_date: string;
  record_5th: Array<{
    upper_body_strength: { level: string; value: string };
    upper_body_flexibility: { level: string; value: string };
    lower_body_strength: { level: string; value: string };
    lower_body_flexibility: { level: string; value: string };
    tug: { level: string; value: string };
    walking_distance: { level: string; value: string };
  }>;
   first_record: FirstRecord;
  comment: string;
  status: string;
  center: string;
}
// // Report 타입 정의
// export interface Report {
//   id: number;
//   member_id: string;
//   name: string;
//   birth: string;
//   center: string;
//   comment: string;
//   first_record: FirstRecord; // FirstRecord 타입으로 정의
// }

// Score 타입 정의
export interface Score {
  value: number;
  level: number;
}

// DataItem 타입 정의
export interface DataItem {
  id: number;
  name: string;
  score1: Score;
  score2: Score;
  score3: Score;
}

// FirstRecord 타입 정의
export interface FirstRecord {
  upper_body_strength: { level: string; value: string };
  upper_body_flexibility: { level: string; value: string };
  lower_body_strength: { level: string; value: string };
  lower_body_flexibility: { level: string; value: string };
  walking_distance: { level: string; value: string };
  tug: { level: string; value: string };
}