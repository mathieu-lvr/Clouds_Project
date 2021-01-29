import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CovidDataService } from './covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class SecurePagesGuard implements CanActivate {
  constructor (private covidDataService : CovidDataService,
    private router: Router){};
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.covidDataService.userSignedIn()){
        this.router.navigate(["covidData"]);
      }
    
      return true;
  }
  
}
