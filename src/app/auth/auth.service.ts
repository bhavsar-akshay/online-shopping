import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExperiationTimer: any;

  constructor(private http: HttpClient, private router: Router, private firebaseAuth: AngularFireAuth) { }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signUp(userEmail: string, userPassword: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseAPIKey,
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true
      }).pipe(
        catchError(this.errorhandler),
        tap(ResponseData => {
          this.handleAuthenticate(ResponseData.email, ResponseData.localId, ResponseData.idToken, +ResponseData.expiresIn);
        }));
  }

  signIn(userEmail: string, userPassword: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseAPIKey,
      {
        email: userEmail,
        password: userPassword,
        returnSecureToken: true
      }).pipe(
        catchError(this.errorhandler),
        tap(ResponseData => {
          this.handleAuthenticate(ResponseData.email, ResponseData.localId, ResponseData.idToken, +ResponseData.expiresIn);
        })
      );
  }

  signout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExperiationTimer) {
      clearTimeout(this.tokenExperiationTimer);
    }

    this.tokenExperiationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, userData._tokenExpirationDate);

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    this.tokenExperiationTimer = setTimeout(() => {
      this.signout();
    }, expirationDuration);
  }

  public handleAuthenticate(email: string, localId: string, idToken: string, expiresIn: number) {
    const ExpirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(
      email,
      localId,
      idToken,
      ExpirationDate
      );
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private errorhandler(errorRes: HttpErrorResponse) {

    let errorMessage = 'Unknown Error Occuerd';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.'
        break;

      case 'EMAIL_NOT_FOUND':
        errorMessage = ' There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;

      default:
        return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }
}
