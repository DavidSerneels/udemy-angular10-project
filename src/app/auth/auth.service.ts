import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';

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

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

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

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
