export interface AuthUser {
  email: string;
  password: string;
  displayName: string;
}
export interface AppUser {
  uid: string;
  email?: string;
  displayName?: string;
  contactName?: string;
  customerNumber?: string;
  taxNumber?: string;
  phoneNumber?: string;
}

export type UpdateAuth = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
};
