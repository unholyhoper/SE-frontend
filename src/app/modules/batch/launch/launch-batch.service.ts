import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Batch} from '../batch.types';
import { environment } from 'environments/environment';

const BATCH = environment.batch;

@Injectable({
    providedIn: 'root'
})
export class BatchService
{
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
}
