export class User {
    public id?: string;
    public fullName: string;
    public email: string;
    public phoneNumber: string;

    constructor(
        fullName: string,
        email: string,
        phoneNumber: string,
        id?: string,
    ) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}
