export interface User {
  id: number;
  name: string;
  credentials: {
  email: string,
  password: string,
  }
}
