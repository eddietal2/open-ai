import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatImageComponent } from './chat-image/chat-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatMessageComponent,
    ChatImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
