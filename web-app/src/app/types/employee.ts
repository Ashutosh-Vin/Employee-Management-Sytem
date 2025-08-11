export  interface IEmployee{
    id:number;
    name:string;
    email:string;
    phone:string;
    jobTitle:string;
    gender:Gender;
    departmentID:number;
    joiningDate:string;
    lastWorkingDate:string;
    dateOfBirth:string;
}

export enum Gender{
    Male=1,
    Female=2,
}