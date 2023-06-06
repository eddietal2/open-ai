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

}
