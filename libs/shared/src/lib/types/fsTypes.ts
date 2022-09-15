// firstore types
export type fsUser = {
  uid: string;
  email?: string;
  displayName?: string;
  contactName?: string;
  customerNumber?: string;
  taxNumber?: string;
  phoneNumber?: string;
  shippingAddress?: fsAddress;
  billingAddress?: fsAddress;
};

export type fsAddress = {
  street: string;
  number: string;
  numberExtra?: string;
  zipcode: string;
  city: string;
  country: string;
};
