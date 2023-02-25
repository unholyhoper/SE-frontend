import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {BatchJobPagination, JobExecution} from "./batch.types";
import {BatchService} from "./launch/launch-batch.service";


@Injectable({
    providedIn: 'root'
})
export class JobExecutionsResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _batchService: BatchService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{ pagination: BatchJobPagination; jobExecutions: JobExecution[] }>
    {
        return this._batchService.getJobExecutions();
    }
}
