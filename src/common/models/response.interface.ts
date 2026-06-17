export interface Response<T = any> {
  code: number;
  messages?: string[] | null;
  error?: string | null;
  data: T;
}
