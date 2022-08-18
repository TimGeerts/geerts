// REQUESTS

export type ResetPasswordRequest = {
  uid: string;
  password: string;
};

// RESPONSES
export type UpdateAuthenticationResponse = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
};
