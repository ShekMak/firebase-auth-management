import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from '@firebase/app-compat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private angularFireAuth: AngularFireAuth) { }

  getCurrentUser(): Observable<any> {
    return this.angularFireAuth.authState;
  }

  signUpWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  signInWithProvider(provider: any): Promise<any> {
    return this.angularFireAuth.signInWithPopup(provider);
  }

  signInWithGoogle(): Promise<any> {
    return this.signInWithProvider(new firebase.auth.GoogleAuthProvider());
  }

  signOut(): Promise<any> {
    return this.angularFireAuth.signOut();
  }

}
