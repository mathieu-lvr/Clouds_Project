import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(
    private http:HttpClient
  ) { }

  apiCall(){
    return this.http.get('https://api.covid19api.com/summary');
  }
  apiCall2(){
    return this.http.get('https://corona.lmao.ninja/v2/historical/all?lastdays=8')
  }
  apiCall3(){
    return this.http.get('https://corona.lmao.ninja/v2/historical/all')
  }
  

}
