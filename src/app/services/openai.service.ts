import { Injectable, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { formatDistance } from 'date-fns';
import { environment } from 'src/environments/environment';
import { IonButton, IonContent, IonInput } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';

// OPEN AI Config
const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Chat Message Interfaces
interface ChatMessage {
  message: any;
  date: string;
  isAI: boolean;
}
interface ChatImage {
  url: any;
  message: string,
  date: string;
  isAI: boolean;
}
interface ChatTranslations {
  filename: string;
  message: string,
  date: string;
  isAI: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class OpenAIService implements OnInit {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
  ) { }

  ngOnInit(): void {
  }
  
  listModels() {
    openai.listModels().then(a => {
      console.log(a)
    })
  }

  chosenFile!: File;
  tappedAudioInput(e: any) {
    this.chosenFile = e.target.files[0];
    console.log(e.target.files[0])
  }
  
  // For changing pages with top-right toolbar
  chatType = "text";
  changeChatText(messageInput: IonInput,  audioInput: any, changeChatTextButton: IonButton, changeChatImageButton: IonButton, changeChatAudioButton: IonButton) {
    this.chatType = "text";
    messageInput.placeholder = "Send a Message";
    messageInput['el'].style.display = 'block';
    audioInput.style.display = 'none';

    changeChatTextButton.size = 'large';
    changeChatTextButton['el'].style.opacity = '1';

    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';

    changeChatAudioButton.size = 'small';
    changeChatAudioButton['el'].style.opacity = '0.5';
  }
  changeChatImage(messageInput: IonInput, audioInput: any, changeChatTextButton: IonButton, changeChatImageButton: IonButton, changeChatAudioButton: IonButton) {
    this.chatType = "image";
    messageInput.placeholder = "Search for an image to generate";
    messageInput['el'].style.display = 'block';
    audioInput.style.display = 'none';

    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';

    changeChatImageButton.size = 'large';
    changeChatImageButton['el'].style.opacity = '1';

    changeChatAudioButton.size = 'small';
    changeChatAudioButton['el'].style.opacity = '0.5';
  }
  changeChatAudio(messageInput: IonInput, audioInput: any, changeChatTextButton: IonButton, changeChatImageButton: IonButton, changeChatAudioButton: IonButton) {
    this.chatType = "audio";
    messageInput['el'].style.display = 'none';
    messageInput.placeholder = "Send Audio";
    audioInput.style.display = 'block';

    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';

    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';

    changeChatAudioButton.size = 'large';
    changeChatAudioButton['el'].style.opacity = '1';
  }
  

  // Messages
  messages: ChatMessage[] = [];
  async sendMessageText(input: IonInput, ionContent: IonContent) {

    const loading = await this.loadingController.create({
      message: 'Generating Message',
    })

    loading.present()
    
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
        message: input['value'],
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: false
      },
    );
    await this.messages.push(
      {
        message: completion.data.choices[0].message?.content,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    );

    loading.dismiss();

    // Clear Input Field and Scroll to the bottom of the page
    input.value = '';
    ionContent.scrollToBottom(500);
  }

  images: ChatImage[] = [];
  async sendMessageImage(input: IonInput, ionContent: IonContent) {

    const loading = await this.loadingController.create({
      message: 'Generating Message',
    })

    loading.present()

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
    })

    await this.images.push(
      {
        url: response.data.data[0].url,
        message: input.value as string,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    );

    loading.dismiss();
    
    // Clear Input Field and Scroll to the bottom of the page
    input.value = '';
    ionContent.scrollToBottom(500);
  }

  fileData: any;
  translations: ChatTranslations[] = [];
  async sendMessageAudio(input: any, ionContent: IonContent) {

    const loading = await this.loadingController.create({
      message: 'Generating Message',
    })

    loading.present()
    
    await openai.createTranslation(
      this.chosenFile,
      "whisper-1"
    ).then(a => {
      console.log(a)
      this.fileData = a;
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

    await this.translations.push(
      {
        filename: this.chosenFile.name,
        message: this.fileData.data.text,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    );

    loading.dismiss();
    
    // Clear Input Field and Scroll to the bottom of the page
    input.value = '';
    ionContent.scrollToBottom(500);
  }
}
