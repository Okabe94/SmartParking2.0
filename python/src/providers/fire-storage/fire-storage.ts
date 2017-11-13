import { Injectable } from '@angular/core';
//Firebase
import * as firebase from 'firebase';


@Injectable()
export class FireStorageProvider {

	firestore = firebase.storage();

  constructor() {

  }

  getUrlStorage(urlFile,callback){
     return this.firestore.ref().child(urlFile).getDownloadURL().then((file) => { 
         callback(file);
     })
   } 



}
