export interface IResources {
    name: string;
    amount: number;
}


export interface IUser {
    _id: string;
    username: string;
    organization: string;
    area?: string;
    resources: IResources[];
}
