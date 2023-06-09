import { Injectable, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { formatDistance, format } from 'date-fns';
import { environment } from 'src/environments/environment';
import { IonButton, IonContent, IonFooter, IonIcon, IonInput } from '@ionic/angular';
import { ToastController, LoadingController } from '@ionic/angular';

// Fix 'localVarFormParams.getHeaders is not a function' bug 
// when trying to translate audio @ sendMessageAudio()
// https://github.com/openai/openai-node/issues/75
class CustomFormData extends FormData {
  getHeaders() {
      return {}
  }
}

// OPEN AI Config
const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
  formDataCtor: CustomFormData
});
const openai = new OpenAIApi(configuration);

// Chat Message Interfaces
interface ChatMessage {
  message: any;
  date: string;
  isAI: boolean;
}
interface ChatImage {
  imageDataURL: any;
  imageBlob: Blob,
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
    this.listAIModels()
  }
  
  models: any;
  listAIModels() {
    openai.listModels().then(a => {
      console.clear();
      this.models = a.data.data;
      for (let i = 0; i < this.models.length; i++) {
        this.models[i]['created'] = format(this.models[i]['created'], 'MM/dd/yyyy')
      }
    })
  }

  getCurrentAIModelData() {
    openai.retrieveModel('')
  }

  // For changing pages with top-right toolbar
  chatType = "text";
  changeChatText(messageInput: IonInput,  audioInput: any, changeChatTextButton: IonIcon, changeChatImageButton: IonIcon, changeChatAudioButton: IonIcon, changeToInfoPageButton: IonIcon, ionFooter: IonFooter) {
    this.chatType = "text";
    messageInput.placeholder = "Send a Message";
    messageInput['el'].style.display = 'block';
    audioInput.style.display = 'none';
    ionFooter['el'].style.height = '66px';

    changeChatTextButton.size = 'large';
    changeChatTextButton['el'].style.opacity = '1';
    changeChatTextButton['el'].style.color = '#f5d806';
    changeChatTextButton['el'].style.borderBottom = '#f5d806 2px solid';

    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';
    changeChatImageButton['el'].style.color = '#fff';
    changeChatImageButton['el'].style.borderBottom = 'none';

    changeChatAudioButton.size = 'small';
    changeChatAudioButton['el'].style.opacity = '0.5';
    changeChatAudioButton['el'].style.color = '#fff';
    changeChatAudioButton['el'].style.borderBottom = 'none';

    changeToInfoPageButton.size = 'small';
    changeToInfoPageButton['el'].style.opacity = '0.5';
    changeToInfoPageButton['el'].style.color = '#fff';
    changeToInfoPageButton['el'].style.borderBottom = 'none';
  }
  changeChatImage(messageInput: IonInput, audioInput: any, changeChatTextButton: IonIcon, changeChatImageButton: IonIcon, changeChatAudioButton: IonIcon, changeToInfoPageButton: IonIcon, ionFooter: IonFooter) {
    this.chatType = "image";
    messageInput.placeholder = "What Image do you want to generate?";
    messageInput['el'].style.display = 'block';
    audioInput.style.display = 'none';
    ionFooter['el'].style.height = '66px';

    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';
    changeChatTextButton['el'].style.color = '#fff';
    changeChatTextButton['el'].style.borderBottom = 'none';

    changeChatImageButton.size = 'large';
    changeChatImageButton['el'].style.opacity = '1';
    changeChatImageButton['el'].style.color = '#f5d806';
    changeChatImageButton['el'].style.borderBottom = '#f5d806 2px solid';

    changeChatAudioButton.size = 'small';
    changeChatAudioButton['el'].style.opacity = '0.5';
    changeChatAudioButton['el'].style.color = '#fff';
    changeChatAudioButton['el'].style.borderBottom = 'none';

    changeToInfoPageButton.size = 'small';
    changeToInfoPageButton['el'].style.opacity = '0.5';
    changeToInfoPageButton['el'].style.color = '#fff';
    changeToInfoPageButton['el'].style.borderBottom = 'none';
  }
  changeChatAudio(messageInput: IonInput, audioInput: any, changeChatTextButton: IonIcon, changeChatImageButton: IonIcon, changeChatAudioButton: IonIcon, changeToInfoPageButton: IonIcon, ionFooter: IonFooter) {
    this.chatType = "audio";
    messageInput['el'].style.display = 'none';
    messageInput.placeholder = "Send Audio";
    audioInput.style.display = 'block';
    ionFooter['el'].style.height = '66px';

    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';
    changeChatTextButton['el'].style.color = '#fff';
    changeChatTextButton['el'].style.borderBottom = 'none';

    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';
    changeChatImageButton['el'].style.color = '#fff';
    changeChatImageButton['el'].style.borderBottom = 'none';

    changeChatAudioButton.size = 'large';
    changeChatAudioButton['el'].style.opacity = '1';
    changeChatAudioButton['el'].style.color = '#f5d806';
    changeChatAudioButton['el'].style.borderBottom = '#f5d806 2px solid';

    changeToInfoPageButton.size = 'small';
    changeToInfoPageButton['el'].style.opacity = '0.5';
    changeToInfoPageButton['el'].style.color = '#fff';
    changeToInfoPageButton['el'].style.borderBottom = 'none';
  }
  changeToInfoPage(messageInput: IonInput, audioInput: any, changeChatTextButton: IonIcon, changeChatImageButton: IonIcon, changeChatAudioButton: IonIcon, changeToInfoPageButton: IonIcon, ionFooter: IonFooter) {
    this.chatType = "info";
    messageInput['el'].style.display = 'none';
    ionFooter['el'].style.height = '0px';

    changeChatTextButton.size = 'small';
    changeChatTextButton['el'].style.opacity = '0.5';
    changeChatTextButton['el'].style.color = '#fff';
    changeChatTextButton['el'].style.borderBottom = 'none';

    changeChatImageButton.size = 'small';
    changeChatImageButton['el'].style.opacity = '0.5';
    changeChatImageButton['el'].style.color = '#fff';
    changeChatImageButton['el'].style.borderBottom = 'none';

    changeChatAudioButton.size = 'small';
    changeChatAudioButton['el'].style.opacity = '0.5';
    changeChatAudioButton['el'].style.color = '#fff';
    changeChatAudioButton['el'].style.borderBottom = 'none';

    changeToInfoPageButton.size = 'large';
    changeToInfoPageButton['el'].style.opacity = '1';
    changeToInfoPageButton['el'].style.color = '#f5d806';
    changeToInfoPageButton['el'].style.borderBottom = '#f5d806 2px solid';
  }
  
  // OpenAI API Error Codes
  // https://platform.openai.com/docs/guides/error-codes

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
      message: 'Generating Image from your prompt. This make take a few moments ...',
    })

    loading.present()

    const response = await openai.createImage({
      prompt: input.value as string,
      size: "1024x1024",
      response_format: 'b64_json'
    }).catch(async (e: Error) => {

      const toast = await this.toastController.create({
        message: e.message,
        color: 'danger',
        duration: 1500,
        position: 'top',
      });

      input.value = '';
      await ionContent.scrollToBottom(500);
      await toast.present();
      await loading.dismiss();
      throw Error(e.message);
    })
    
    // To create a blob from a base64 string, use the atob function.
    // b64JSON is encoded, A binary 'JSON' string containing base64-encoded data.
    // A string in which each character in the string is treated as a byte of binary data.
    let b64JSON = response.data.data[0].b64_json as string;
    let decodeImage = atob(b64JSON);

    // Create an array of byte values from each character of the string.
    const byteNumbers = new Array(decodeImage.length);
    for (let i = 0; i < decodeImage.length; i++) {
        byteNumbers[i] = decodeImage.charCodeAt(i);
    }

    // Convert the byte numbers array to an Uint8Array.
    const byteArray = new Uint8Array(byteNumbers);
    
    // Create new Blob from byteArray.
    // Blobs represent raw immutable data.
    // Make sure that each image gets downloaded as a PNG
    const imageToBlob = new Blob([byteArray], {type: 'image/png'});
    console.clear();
    console.log(b64JSON)
    console.log(imageToBlob)

    // Create Image from Blob
    // Download Image
    const reader = new FileReader;
    reader.addEventListener('load', () => {
      const image = new Image;
      image.src = reader.result as string;
      document.body.appendChild(image);
    });
    reader.readAsDataURL(imageToBlob);

    await this.images.push(
      {
        imageDataURL: "data:image/png;base64," + b64JSON,
        imageBlob: imageToBlob,
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

  chosenFile!: File;
  tappedAudioInput(e: any) {
    this.chosenFile = e.target.files[0];
    console.log(e.target.files[0])
  }

  fileData: any;
  translations: ChatTranslations[] = [];
  async sendMessageAudio(input: any, ionContent: IonContent) {

    const loading = await this.loadingController.create({
      message: 'Generating Translation',
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
