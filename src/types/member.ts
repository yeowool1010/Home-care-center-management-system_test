export type Member = {
  id: number;
  member_id: string;
  center: string;
  name: string;
  date_of_birth: string; // ISO 날짜 문자열 (예: 'YYYY-MM-DD')
  phone_number: string;
  care_grade: string;
  assistive_device: string;
  admission_date: string; // ISO 날짜 문자열 (예: 'YYYY-MM-DD')
  address: string;
  gender: string;
  guardian_name: string;
  guardian_relationship: string;
  guardian_address: string;
  guardian_contact: string;
};
