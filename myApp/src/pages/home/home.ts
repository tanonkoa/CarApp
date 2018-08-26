import { Component, NgModule } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular/umd';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { NativeStorage } from '@ionic-native/native-storage';


// To launch and run the emulator from the browser : ionic cordova platform add browser -- and -- ionic cordova run browser 
// To launch and run the emulator from IOS/Android : ionic cordova platform add ios/android --- and --ionic cordova run ios/android

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

@NgModule({


})


export class HomePage {

  // We declare the variables:

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

  constructor(public navCtrl: NavController, public alertCtrl :AlertController,  private geolocation: Geolocation, private camera: Camera, private deviceMotion: DeviceMotion,
    private nativeStorage: NativeStorage ) { 

    this.x = " ";
    this.y =" ";
    this.z =" ";
    this.timestamp = " ";
    this.lattitude=" ";
    this.longitude=" ";
    this.speed=" ";
    }

  /* We do not use this method here */
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
    
    // We define the options of the picture and camera:
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true //We must specify that is True  to save the picture into the device's Gallery 
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });


  }



  /* To have the accelerometer */
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

  /* To stop the accelerometer */
  stop() { this.id.unsubscribe }





  /* To have the Geolocation */
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








  /*  We need to store the data into the native storage and return them if the user want to see them */
  public storeData(): void {

      this.nativeStorage.setItem('navigatioData', {x: this.x, y: this.y, z: this.z, timestamp:this.timestamp,
        lattitude: this.lattitude, longitude: this.longitude, speed: this.speed})
       .then( () =>{let alert = this.alertCtrl.create({
        title: 'Data saved',
        buttons: ['OK']
        });
        alert.present();
       },
        error => {let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Data are not saved',
          buttons: ['Sorry']
          });
          alert.present();


         }
       );
      }

  public getStoringData(): void {
      this.nativeStorage.getItem('navigationData')
       .then(
         data => { this.x = data.x;
                   this.y = data.y;
                   this.z = data.z;
                   this.lattitude= data.lattitude;
                   this.longitude = data.longitude;
                   this.speed = data.speed
                  },
         error => {let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Storage empty',
          buttons: ['Sorry']
          });
          alert.present();


         }
       );  



  }

}





