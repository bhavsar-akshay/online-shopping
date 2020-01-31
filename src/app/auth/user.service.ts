import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private firebaseAuth: AngularFireAuth){ }
	signInWithGoogle() {
		return this.firebaseAuth.auth.signInWithPopup(
		  new firebase.auth.GoogleAuthProvider()
		);
	  }
}
