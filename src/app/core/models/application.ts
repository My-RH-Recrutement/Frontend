import { JobOffer } from "./job-offer";
import { JobSeeker } from "./job-seeker";
import { StatusPostulation } from "../enums/status-postulation";

export class Application {
    public id?: string;
    public motivationLetter: string;
    public jobSeeker: JobSeeker;
    public jobOffer: JobOffer;
    public statusPostulation: StatusPostulation;

    constructor(
        motivationLetter: string,
        jobSeeker: JobSeeker,
        jobOffer: JobOffer,
        statusPostulation: StatusPostulation,
        id?: string
    ) {
        this.motivationLetter = motivationLetter;
        this.jobSeeker = jobSeeker;
        this.jobOffer = jobOffer;
        this.id = id;
        this.statusPostulation = statusPostulation;
    }
}
