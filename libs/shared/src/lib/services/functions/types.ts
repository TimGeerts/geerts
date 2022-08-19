// REQUESTS

export type GetDocumentRequest = {
  uid: string;
};

export type ResetPasswordRequest = {
  uid: string;
  password: string;
};

export type CreateUserRequest = {
  auth: {
    email: string;
    password: string;
    displayName: string;
  };
  user: UpdateUserRequest;
};

export type UpdateUserRequest = {
  uid: string;
  email?: string;
  displayName?: string;
  contactName?: string;
  customerNumber?: string;
  taxNumber?: string;
  phoneNumber?: string;
};

export type DeleteUserRequest = {
  uid: string;
};

// RESPONSES
export type UpdateAuthenticationResponse = {
  email: string;
  password: string;
  displayName: string;
  photoURL: string;
  disabled: boolean;
};
