export interface AppUser {
  uid: string;
  email?: string;
  password?: string;
  displayName?: string;
  contactName?: string;
  customerNumber?: number;
  taxNumber?: string;
  phoneNumber?: string;
  role: string;
}
