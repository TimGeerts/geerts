export interface AppUser {
  uid: string;
  email?: string | null;
  password?: string | null;
  displayName: string | null;
  role: string;
}
