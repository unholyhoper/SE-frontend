import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Policy, ThirdParty, ThirdPartyLegacy} from "./solife.types";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const POLICIES = environment.policies;
const THIRD_PARTIES = environment.thirdparties;
const BATCH = environment.batch;

@Injectable({
    providedIn: 'root'
})
export class SolifeService
{
    private _policies: BehaviorSubject<Policy[] | null> = new BehaviorSubject(null);
    private _thirdParties: BehaviorSubject<ThirdParty[] | null> = new BehaviorSubject(null);

    constructor(private _httpClient: HttpClient)
    {
    }
    getPolicies(): Observable<Policy[]>
    {
        return this._httpClient.get<Policy[]>(`${POLICIES}/`).pipe(
            tap((policies) => {
                this._policies.next(policies);
            })
        );
    }

    get policies$(): Observable<Policy[]>
    {
        return this._policies.asObservable();
    }

    get thirdParties$(): Observable<ThirdParty[]>
    {
        return this._httpClient.get<ThirdParty[]>(`${THIRD_PARTIES}/`).pipe(
            tap((thirdParties) => {
                this._thirdParties.next(thirdParties);
            })
        );
    }

    getPoliciesByThirdParty(externalIDs: any): Observable<Policy[]> {
        console.log('external ids ' ,externalIDs);
        let body = new HttpParams();
        body = body.set('externalIDs', externalIDs);
        return this._httpClient.post<Policy[]>(`${THIRD_PARTIES}/`, body);
    }
}
