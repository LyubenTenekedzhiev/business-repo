export type IdType = string;

export interface BusinessInterface {
  id: IdType;
  name: string;
  description: string;
  phone: string;
  image: string;
  email: string;
  address: {
    number: string;
    street: string;
    zip: string;
    city: string;
    country: string;
  };
}
