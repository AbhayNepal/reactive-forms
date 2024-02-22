import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  httpClient : HttpClient = inject(HttpClient)
 _url='http://localhost:3000/enroll'

  constructor() { }
  register(userData: any){
    return this.httpClient.post<any>(this._url,userData);
  }
}
