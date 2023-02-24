export interface Batch {
    policyNumber: string;
    lifeAssured?: string;
    beneficiary?: string;
    broker?: string;

}


export interface JobExecution {
    jobParameters?: string[];
    status?: string;
    startTime?: string;
    endTime?: string;


}

