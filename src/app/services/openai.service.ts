import { Injectable, OnInit, ViewChild } from '@angular/core';
import { Configuration, ChatCompletionRequestMessage, OpenAIApi, CreateChatCompletionResponse } from 'openai';
import { format, formatDistance } from 'date-fns';
import { environment } from 'src/environments/environment';
import { IonButton, IonContent, IonInput } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ChatMessage {
  text: any;
  date: string;
  isAI: boolean;
}
interface ChatImage {
  url: any;
  message: string,
  date: string;
  isAI: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService implements OnInit {
  
  constructor(
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
  }
  
  listModels() {
    openai.listModels().then(a => {
      console.log(a)
    })
  }
  
  chatType = "text";
  changeChatText(changeChatTextButton: IonButton, changeChatImageButton: IonButton) {
    this.chatType = "text";
    changeChatTextButton['el'].style.transition = '0.25s';
    changeChatImageButton['el'].style.transition = '0.25s';
    changeChatTextButton.size = 'large';
    changeChatTextButton['el'].style.opacity = '1';
    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';
  }
  changeChatImage(changeChatTextButton: IonButton, changeChatImageButton: IonButton) {
    this.chatType = "image";
    changeChatTextButton['el'].style.transition = '0.25s';
    changeChatImageButton['el'].style.transition = '0.25s';
    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';
    changeChatImageButton.size = 'large';
    changeChatImageButton['el'].style.opacity = '1';
  }

  messages: ChatMessage[] = [];
  async sendMessageText(input: IonInput, ionContent: IonContent) {
    
    var completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:  [{
        role: 'user',
        content: input['value'] as string,
        name: 'Alfred',
      }],
      temperature: 0.6,
    }).catch(async (e: Error) => {

      const toast = await this.toastController.create({
        message: e.message,
        color: 'danger',
        duration: 1500,
        position: 'top',
      });
  
      await toast.present();
      throw Error(e.message);
    })

    await this.messages.push(
      {
        text: input,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: false
      },
    );
    await this.messages.push(
      {
        text: completion.data.choices[0].message?.content,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    );

    // Clear Input Field and Scroll to the bottom of the page
    input.value = '';
    ionContent.scrollToBottom(500);
  }

  images: ChatImage[] = [];
  async sendMessageImage(input: IonInput, ionContent: IonContent) {
    const response = await openai.createImage({
      prompt: input.value as string,
      n: 2,
      size: "512x512",
    }).catch(async (e: Error) => {

      const toast = await this.toastController.create({
        message: e.message,
        color: 'danger',
        duration: 1500,
        position: 'top',
      });
  
      await toast.present();
      throw Error(e.message);
    });

    await this.images.push(
      {
        url: response.data.data[0].url,
        message: input.value as string,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    );
    
    // Clear Input Field and Scroll to the bottom of the page
    input.value = '';
    ionContent.scrollToBottom(500);
  }
}
