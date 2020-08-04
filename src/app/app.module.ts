import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule, AngularFireFunctions } from '@angular/fire/functions';

const d={
  apiKey: "AIzaSyAIoICEHE8-ZrjOgPyi6x5cwPrS1rhvECA",
    authDomain: "login-182.firebaseapp.com",
    databaseURL: "https://login-182.firebaseio.com",
    projectId: "login-182",
    storageBucket: "login-182.appspot.com",
    messagingSenderId: "766116896984",
    appId: "1:766116896984:web:2aab10fb42cbf14f13b7ad"
}

export const config=d;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireDatabaseModule,
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    AngularFireFunctionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})



export class AppModule { }
