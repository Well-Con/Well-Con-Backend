export type DoctorData = {
    email: string;
    password: string;
    name: string;
    age: number;
    phoneNo: number;
    address: string;
    city: string;
    Experties: string[];
    Education: string[];
    Gender: string;
};
// id String @id @default(uuid())
//   name String
//   age Int
//   email String @unique
//   phoneNo Int @unique
//   address String
//   city String
//   Experties String[]
//   Education String[]
//   Gender String