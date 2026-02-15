export interface Course {
  slug: string;
  code: string;
  title: string;
  university: string;
  department: string;
  description: string;
  credits: string;
  level: string;
  language: string;
  rating: number;
  metrics: {
    exam: number;
    workload: number;
    attendance: number;
    grading: number;
  };
  reviewsLabel: string;
}
