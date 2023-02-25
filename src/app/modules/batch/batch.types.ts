export interface Batch {
    policyNumber: string;
    lifeAssured?: string;
    beneficiary?: string;
    broker?: string;

}


export interface JobExecution {

    id: number;
    jobParameters?: string[];
    status?: string;
    startTime?: string;
    endTime?: string;


}

export interface BatchJobPagination
{
    length: number;
    size: number;
    page: number;
    lastPage: number;
    startIndex: number;
    endIndex: number;
}
