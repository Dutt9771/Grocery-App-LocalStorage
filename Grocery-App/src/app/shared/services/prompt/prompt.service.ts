import { Injectable } from '@angular/core';
import { ButtonLayoutDisplay, ButtonMaker, DialogInitializer, DialogLayoutDisplay } from '@costlydeveloper/ngx-awesome-popup';
import { ManageaddressComponent } from 'src/app/modules/front/user/manageaddress/manageaddress.component';
import { HomeComponent } from '../../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class PromptService {

  constructor() { }
  dialog() {
        
    // Instance of DialogInitializer includes any valid angular component as argument.
    const dialogPopup = new DialogInitializer(ManageaddressComponent);
    
    // Any data can be sent to AnyAngularComponent.
    dialogPopup.setCustomData("Are You Sure "); // optional
    
    // Set some configuration.
    dialogPopup.setConfig({
        width     : '500px',
        layoutType: DialogLayoutDisplay.NONE // SUCCESS | INFO | NONE | DANGER | WARNING
    });
    
    // Set some custom buttons as list.
    // SUCCESS | INFO | NONE | DANGER | WARNING | PRIMARY | SECONDARY | LINK | DARK | LIGHT
    dialogPopup.setButtons([ 
        new ButtonMaker('Delete', 'delete', ButtonLayoutDisplay.WARNING),
        new ButtonMaker('Cancel', 'cancel', ButtonLayoutDisplay.SECONDARY)
    ]);

    // Simply open the popup and observe which button is clicked and, 
    // receive optional payload from AnyAngularComponent.
    dialogPopup.openDialog$().subscribe(resp => {
        console.log('dialog response: ', resp);
        return resp.clickedButtonID
    });
}
}
