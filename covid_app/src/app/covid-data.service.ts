import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import { User } from './user.model';
import { Router } from '@angular/router';
import { News } from './news.model';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  private user!: User;

  constructor(private afAuth: AngularFireAuth, 
    private router: Router, private firestore : AngularFirestore) { }

  async signInWithGoogle(){
    const credentials = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    this.user = {
      uid : credentials.user?.uid as string,
      displayName: credentials.user?.displayName as string,
      email: credentials.user?.email as string
    };
    localStorage.setItem("user", JSON.stringify(this.user));
    this.updateUserData();
    this.router.navigate(["covidData"]);
  }

  private updateUserData(){
    this.firestore.collection("users").doc(this.user.uid).set({
      uid: this.user.uid,
      displayName: this.user.displayName,
      email: this.user.email
    },{ merge: true});
  }

  getUser(){
    if (this.user ==null && this.userSignedIn()){
      this.user = JSON.parse(localStorage.getItem("user")!);
    }
    
    return this.user;
  }

  userSignedIn(): boolean{
    return JSON.parse(localStorage.getItem("user")!) != null;
  } 

  signOut(){
    this.afAuth.signOut();
    localStorage.removeItem("user");
    this.user = null!;
    this.router.navigate(["signin"]);
  }
  storeNews(news : News){
    this.firestore.collection("News").add(news),{merge : true};

  }

  getNews(){
    return this.firestore.collection("users").doc(this.user.uid).collection("News").valueChanges();
  }
  addNews(news: News){
    this.firestore.collection("users").doc(this.user.uid).collection("News").add(news);
    this.storeNews(news);
  }
  
}
