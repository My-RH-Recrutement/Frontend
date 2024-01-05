import { JobOffer } from "./job-offer";
import { User } from "./user";

export class Recruiter extends User {
    public password: string;
    public address: string;
    public image: string | File;
    public jobOffers: JobOffer[];

    constructor(
        fullName: string,
        email: string,
        phoneNumber: string,
        password: string,
        address: string,
        image: string | File,
        jobOffers: JobOffer[],
        id?: string,
    ) {
        super(fullName, email, phoneNumber, id);
        this.password = password;
        this.address = address;
        this.image = image;
        this.jobOffers = jobOffers;
    }
}
