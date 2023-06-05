import { Component } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { format, formatDistance } from 'date-fns'

interface ChatMessage {
  text: string;
  date: string;
  isAI: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = "Open AI App Demo";

  messages: ChatMessage[] = [
    {
      text: "This is a message from ..",
      date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
      isAI: false
    },
    {
      text: "This is a message from AI ..",
      date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
      isAI: true
    },
  ];

  sendMessage(input: IonInput) {
    console.log(input.value)
    input.value = "";
  }
}