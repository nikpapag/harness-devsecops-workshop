import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiUrl= environment.defaultApiUrl;
  sdkKey= environment.defaultSDKKey;

  constructor() {
      this.apiUrl = environment.defaultApiUrl;
    }


  getApiUrl(): string {
    return this.apiUrl;
  }


  getSDKKey(): string{
    return this.sdkKey;
  }




}
