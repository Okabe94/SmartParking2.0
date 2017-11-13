import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';




import { AngularFireAuth } from "angularfire2/auth"
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularFire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

import { FireStorageProvider } from '../../providers/fire-storage/fire-storage';

import { AlertProvider } from '../../providers/alert/alert';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})



export class PrincipalPage {
  firebaseUser: FirebaseListObservable<any[]>;
  public datos: Array<any>;
  private formTarjetaId: FormGroup;
  public totalCarros:any; 

  public bandera:boolean = false;

  firestore = firebase.storage();

  firequery = firebase.database().ref('query-data');
  public imgFondo;
  
  public queryPaqueadero:any;
  constructor(
    private navController: NavController,
    private afAuth: AngularFireAuth,
    private toasCtrl: ToastController,
    public afd: AngularFireDatabase,
    private formBuilder: FormBuilder,
    public fsp:FireStorageProvider,
    public alertProvider:AlertProvider
    ) {

  }

  ngOnInit(){
    this.creareForm();
    this.firebaseUser = this.afd.list('/Parqueadero');    
    
    // this.queryPaqueadero = this.firequery.ref.child('User/');

    // this.queryPaqueadero.orderByChild("id").equalTo('E9 D3 E7 AB').on('value' , 
    //   function(data){
    //     console.log(data.val())
    //   })

    this.firebaseUser.subscribe(lista => {      
      this.datos=lista;    
      var evento = this.datos[1]['$value'];
      if(evento != undefined){
        if(evento == "Salio"){
          this.alertProvider.viewMessageToastController("Que tenga un buen dia")
        }
        if(evento == "Entro"){
          this.alertProvider.viewMessageToastController("Bienvenido")
        }
      }
      this.formTarjetaId.controls.evento.setValue(evento);  
      this.formTarjetaId.controls.id.setValue(this.datos[2]['$value']);  
      this.totalCarros=this.datos[3]['$value'];
      this.formTarjetaId.controls.totalAutos.setValue(this.totalCarros);  
    })
    this.fsp.getUrlStorage("LogoSmartParking.png",this.getUrlStorageImage.bind(this));
  }

  getUrlStorageImage(image){
    this.imgFondo = image;

  }

  getUrlStorage(urlFile,callback){
    return this.firestore.ref().child(urlFile).getDownloadURL().then((file) => { 
      callback(file);
    })
  } 



  creareForm() {

    this.formTarjetaId = this.formBuilder.group({
      id: ['', Validators.required],
      totalAutos: ['', Validators.required],
      evento: ['', Validators.required],   
    });

    
  }

  

  

}
