import { User } from "./user";

export class Agent extends User {

    public password: string;

    constructor(
        password: string,
        fullName: string,
        email: string,
        phoneNumber: string,
        id?: string,
    ) {
        super(fullName, email, phoneNumber, id);
        this.password = password;
    }
}
