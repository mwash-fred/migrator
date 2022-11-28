import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPayload } from '../interfaces/login-payload';
import { LoginResponse } from '../interfaces/login-response';
import { MessageResponse } from '../interfaces/message-response';
import { VerifyOTP } from '../interfaces/verify-otp';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl=environment.baseUrl+'auth'

  constructor(private http: HttpClient) { }

  $login = (payload : LoginPayload) => <Observable<LoginResponse>>
  this.http.post<LoginResponse>(this.apiUrl+'signin', payload).pipe(
    tap(console.log),
    catchError(this.handleError)
  )

  $verifyOTP = (payload : VerifyOTP) => <Observable<MessageResponse>>
  this.http.post<LoginResponse>(this.apiUrl+'verifyOTP', payload).pipe(
    tap(console.log),
    catchError(this.handleError)
  )



  handleError(error : any) : Observable<never>{
    return throwError('Method not Implemented');
  }
}
