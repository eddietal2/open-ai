import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-image',
  templateUrl: './chat-image.component.html',
  styleUrls: ['./chat-image.component.scss']
})
export class ChatImageComponent implements OnInit {
  @Input() url = '';
  @Input() message = '';
  @Input() date = '';
  @Input() isAI = false;

  constructor() { }

  ngOnInit(): void {
  }

  async downloadImage(url: string) {
    console.log(url);
    const image = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
    console.log(image);
    // const imageBlog = await image.blob()
    // const imageURL = URL.createObjectURL(imageBlog);

    // const link = document.createElement('a')
    // link.href = imageURL
    // link.download = 'ai_image'
    // document.body.appendChild(link)
    // link.click()
    // document.body.removeChild(link)
  }

}
