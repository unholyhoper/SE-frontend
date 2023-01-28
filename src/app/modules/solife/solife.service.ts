import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Policy} from "./solife.types";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

const POLICIES = environment.policies;

@Injectable({
    providedIn: 'root'
})
export class SolifeService
{
    private _policies: BehaviorSubject<Policy[] | null> = new BehaviorSubject(null);

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
}
