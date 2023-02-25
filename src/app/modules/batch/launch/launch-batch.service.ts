import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Batch, BatchJobPagination, JobExecution} from '../batch.types';
import { environment } from 'environments/environment';

const BATCH = environment.batch;

@Injectable({
    providedIn: 'root'
})
export class BatchService
{
    private _pagination: BehaviorSubject<BatchJobPagination | null> = new BehaviorSubject(null);
    private _jobExecutions: BehaviorSubject<JobExecution[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient)
    {
    }
    launchBatch(policyNumbers: any, mailNotification: boolean, jsonExtraction: boolean,thirdPartiesExternalIds: string[]): Observable<Batch> {
        let body = new HttpParams();
        body = body.set('policyNumbers', policyNumbers);
        body = body.set('mailNotification', mailNotification);
        body = body.set('jsonExtraction', jsonExtraction);
        body = body.set('externalIDs', thirdPartiesExternalIds.join(','));
        return this._httpClient.post<Batch>(`${BATCH}/start`, body);
    }


    /**
     * Get products
     *
     *
     * @param page
     * @param size
     * @param sort
     * @param order
     * @param search
     */
    getJobExecutions(page: number = 0, size: number = 10, sort: string = 'name', order: 'asc' | 'desc' | '' = 'asc', search: string = ''):
        Observable<{ pagination: BatchJobPagination; jobExecutions: JobExecution[] }>
    {
        return this._httpClient.get<{ pagination: BatchJobPagination; jobExecutions: JobExecution[] }>(`${BATCH}/batch-jobs`, {
            params: {
                page: '' + page,
                size: '' + size,
                sort,
                order,
                search
            }
        }).pipe(
            tap((response) => {
                this._pagination.next(response.pagination);
                this._jobExecutions.next(response.jobExecutions);
            })
        );
    }

    /**
     * Getter for products
     */
    get jobExecutions$(): Observable<JobExecution[]>
    {
        return this._jobExecutions.asObservable();
    }

    get pagination$(): Observable<BatchJobPagination>
    {
        return this._pagination.asObservable();
    }
}
