

export interface IUser{
    name      : string,
    email     : string,
    password? : string,
    role      : string,

    createdAT?: string;
    updatedAT?: string;
}
