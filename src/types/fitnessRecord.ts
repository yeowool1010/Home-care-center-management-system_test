export interface FitnessRecord {
  id: number;
  member_id: string;
  check_th: number;
  measurement_date: string;
  upper_body_strength: { level: number; value: number };
  upper_body_flexibility: { level: number; value: number };
  lower_body_strength: { level: number; value: number };
  lower_body_flexibility: { level: number; value: number };
  tug: { level: number; value: number };
  walking_distance: { level: number; value: number };
  avg_level: number;
  status: string;
  comment: string | null;
  name:string | null;
}
