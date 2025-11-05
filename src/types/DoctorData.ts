import { Doctor, Role } from "@prisma/client";

// For req.body
export type DoctorDTO = {
  email: string;
  password: string;
  name: string;
  age: number;
  phoneNo: string;
  gender: string;
  expertise: string[];
  education: string[];
  experience: string;
  registrationNo: string;
  consultationTypes: ("Online" | "InPerson")[];
  consultationFee: number[];
  address: {
    city: string;
    state: string;
    street?: string;
    area?: string;
    type?: string;
  };
};  

// For Prisma (after transformation)
export type DoctorData = {
  user: {
    create: {
      email: string;
      password: string;
      name: string;
      age: number;
      phoneNo: string;
      gender: string;
      role: "DOCTOR";
      addresses: {
        create: {
          name?: string;
          city: string;
          street?: string;
          area?: string;
          state: string;
          buildingNo?: string;
          type?: string;
        }[];
      };
    };
  };
  expertise: string[];
  education: string[];
  experience: string;
  registrationNo: string;
  consultationTypes: ("Online" | "InPerson")[];
  consultationFee: number[];
};
