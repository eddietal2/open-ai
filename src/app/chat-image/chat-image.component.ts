import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
// https://www.npmjs.com/package/file-saver (Chrome iOS Download workaround)
// https://stackoverflow.com/questions/23872902/chrome-download-attribute-not-working-to-replace-the-original-name/35290284#35290284
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-chat-image',
  templateUrl: './chat-image.component.html',
  styleUrls: ['./chat-image.component.scss']
})
export class ChatImageComponent implements OnInit {
  @Input() imageDataURL = '';
  @Input() imageBlob = new Blob();
  @Input() message = '';
  @Input() date = '';
  @Input() isAI = false;

  constructor(
    private platform: Platform
  ) { }

  ngOnInit(): void {
  }

  async downloadImage(imageDataURL: any) {

    if(this.platform.is('ios')) {
      saveAs(imageDataURL, 'ai_image_'+ Date.now());
    } else {

      const link = document.createElement('a')
      link.href = imageDataURL
      link.download = 'ai_image_'+ Date.now();
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }


  
  }

}
