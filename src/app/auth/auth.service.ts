import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private signupUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
  private loginUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
  private apiKey = 'AIzaSyDjK7U3svW-4j96uURx39FOoQ_xUU_35PU';

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.signupUrl, {
        email: email,
        password: password,
        returnSecureToken: true
      }, {
        params: new HttpParams().set('key', this.apiKey)
      }).pipe(catchError(errorResponse => {
        let errorMessage = 'An error occurred';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS': errorMessage = 'This email is already in use';
        }
        return throwError(errorMessage);
      }));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true
      }, {
        params: new HttpParams().set('key', this.apiKey)
      });
  }
}
