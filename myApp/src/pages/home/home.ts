import { Component, NgModule } from '@angular/core';
import { NavController } from 'ionic-angular/umd';
//import { Gyroscope, GyroscopeOrientation, GyroscopeOptions } from '@ionic-native/gyroscope';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { NativeStorage } from '@ionic-native/native-storage';


// ionic cordova platform add browser -- et -- ionic cordova run browser 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@NgModule({})


export class HomePage {

  picture:any;
  x:string;
  y:string;
  z:string;
  timestamp:string;
  id: any;
  lattitude: any;
  longitude: any;
  speed: any;
  geoid: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation /* private gyroscope: Gyroscope */, private camera: Camera, private deviceMotion: DeviceMotion,
    private nativeStorage: NativeStorage ) { 

    this.x = " ";
    this.y =" ";
    this.z =" ";
    this.timestamp = " ";
    this.lattitude="";
    this.longitude="";
    this.speed="";
    }


  haveGeolocation() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });
    
  }

  
  havePicture() {
    
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });


  }




  start() {

    try{
       var option: DeviceMotionAccelerometerOptions = { frequency: 1000 }
       this.id=this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) =>
        {
            this.x = " " + acceleration.x;
            this.y =" " + acceleration.y;
            this.z =" " + acceleration.z;
            this.timestamp = " " + acceleration.timestamp;

         }
       );
    }
    catch(err){ alert("Error:" + err) }

  }


  stop() { this.id.unsubscribe }


  startLocation(){

      
      try{
          this.id=this.geolocation.watchPosition().subscribe(data=> 
          
          {
            this.lattitude =data.coords.latitude;
            this.longitude = data.coords.longitude;
            this.speed = data.coords.speed;

          }
          
          )

      }
      catch(err){ alert("Error:" + err) }



  }

  stopLocation(){

      this.id.unsubscribe();

  }



  
  /* haveGyroscope() {
   
    
    let options: GyroscopeOptions = { frequency: 1000 };
    this.gyroscope.getCurrent(options).then((orientation: GyroscopeOrientation) => { 
      console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp);}).catch()

    this.gyroscope.watch().subscribe((orientation: GyroscopeOrientation) => {
      console.log(orientation.x, orientation.y, orientation.z, orientation.timestamp); }); 


   } */

}





