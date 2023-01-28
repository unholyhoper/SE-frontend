import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {SolifeService} from "./solife.service";
import {Observable} from "rxjs";
import {Policy} from "./solife.types";

@Injectable({
    providedIn: 'root'
})
export class PolicyResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _solifeService: SolifeService)
    {
    }

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Policy[]>
    {
        return this._solifeService.getPolicies();
    }
}
