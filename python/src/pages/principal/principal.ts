import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';




import { AngularFireAuth } from "angularfire2/auth"
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularFire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


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
  constructor(
    private navController: NavController,
    private afAuth: AngularFireAuth,
    private toasCtrl: ToastController,
    public afd: AngularFireDatabase,
    private formBuilder: FormBuilder,
    ) {
    this.creareForm();
    
    
    //this.formTarjetaId.controls.totalAutos.setValue(this.totalCarros);

    //Evento de Cambio de Tarjeta
    //this.firebaseUser = this.afd.list('/EventoTarjeta');
    this.firebaseUser = this.afd.list('/Parqueadero');
    this.firebaseUser.subscribe(lista => {      
    this.datos=lista;

    // //verificacion Primera Vez (No es necesario que ahi este el id la primera vez)
    // if(this.bandera == false){
    // this.formTarjetaId.controls.id.setValue("");   
    // this.bandera = true;
    // }else{      
    this.formTarjetaId.controls.evento.setValue(this.datos[0]['$value']);  
    this.formTarjetaId.controls.id.setValue(this.datos[1]['$value']);  
    this.totalCarros=this.datos[2]['$value'];
    this.formTarjetaId.controls.totalAutos.setValue(this.totalCarros);  

    
    // }

    })
    

    }


 creareForm() {

    this.formTarjetaId = this.formBuilder.group({
      id: ['', Validators.required],
      totalAutos: ['', Validators.required],
      evento: ['', Validators.required],   
    });

    
  }

  enviar(){
    var codigo = this.formTarjetaId.value.id;

    if(codigo == "E0 2F 9B 1B" && this.totalCarros > 0){
    this.totalCarros = this.totalCarros - 1;
    this.formTarjetaId.controls.totalAutos.setValue(this.totalCarros);   
    this.formTarjetaId.controls.evento.setValue("Entro");    
    }else{
      if(this.totalCarros <= 0){
        this.toasCtrl.create({
        message: "El numero de carros ya estan en ceros Imposible una salida de alguien mas", duration: 3000
      }).present();
      }
    }
    if(codigo == "E9 D3 E7 AB" && this.totalCarros < 100){
    this.totalCarros = this.totalCarros + 1;     
    this.formTarjetaId.controls.totalAutos.setValue(this.totalCarros);   
    this.formTarjetaId.controls.evento.setValue("Salio");

    }else{
      if(this.totalCarros >= 100){
          this.toasCtrl.create({
        message: "Numero maximo de carros en el paqueadero", duration: 3000
      }).present();
      }

    }
    
  }

}
