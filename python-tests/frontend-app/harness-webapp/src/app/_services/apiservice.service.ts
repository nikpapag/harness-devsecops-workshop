import { EventEmitter, Injectable, NgModule } from '@angular/core';
import { ConfigService } from './config.service';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  //APIUrl ="http://localhost:8000"
 
  private APIUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.APIUrl = this.configService.getApiUrl();
    console.log('API URL in API Service:', this.APIUrl);  

  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };



  getDetails(){
    return this.http.get<any>(
      this.APIUrl+'/deploy/execution',this.httpOptions
    )
  }


  getDistribution(startTimestamp:any, endTimestamp:any){
    return this.http.get<any>(
      this.APIUrl + '/deploy/distribution', {
        params: {
          start_timestamp: startTimestamp.toISOString(),
          end_timestamp: endTimestamp.toISOString()
        },
        ... this.httpOptions}
    );
  }
  getBarDistribution(startTimestamp:any, endTimestamp:any){
    return this.http.get<any>(
      this.APIUrl + '/deploy/distribution/bar', {
        params: {
          start_timestamp: startTimestamp.toISOString(),
          end_timestamp: endTimestamp.toISOString()
        },
        ... this.httpOptions}
    );
  }

  generateEntry(name:any){
    const jsonObject={
      "name": name
    }
    return this.http.post<any>(
      this.APIUrl +'/deploy/create',jsonObject,this.httpOptions
    );
  }


  checkRelease(){
    return this.http.get<any>(
      this.APIUrl+'/deploy/check/release',this.httpOptions
    )
  }



}
