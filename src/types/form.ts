export interface Option {
  value: string;
  label: string;
}

export type QuestionType = "radio" | "checkbox";

export interface Question {
  id: string;
  title: string;
  required?: boolean;
  type?: string;
  options: Option[];
  answer?: string[];
  img?: string;
  hasCustomOption?: boolean;
}
