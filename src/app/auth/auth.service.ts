import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';

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

  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.signupUrl, {
        email: email,
        password: password,
        returnSecureToken: true
      }, {
        params: new HttpParams().set('key', this.apiKey)
      }).pipe(
        catchError(this.handleError),
        tap(responseData => this.handleAuthentication(responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn)));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true
      }, {
        params: new HttpParams().set('key', this.apiKey)
      }).pipe(
        catchError(this.handleError),
        tap(responseData => this.handleAuthentication(responseData.email,
          responseData.localId,
          responseData.idToken,
          +responseData.expiresIn)));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS': errorMessage = 'This email is already in use'; break;
      case 'EMAIL_NOT_FOUND': errorMessage = 'This email doesn\'t exist'; break;
      case 'INVALID_PASSWORD': errorMessage = 'Invalid password'; break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }
}
