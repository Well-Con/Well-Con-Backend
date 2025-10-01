export type UserData = {
  email: string;
  password: string;
  name: string;
  age: number;
  phoneNo: string;
  gender: string;
  address: {
    city: string;
    state: string;
    street?: string;
    area?: string;
    type?: string;
  };
};
