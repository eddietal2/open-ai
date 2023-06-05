import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {
  @Input() message = '';
  @Input() date = '';
  @Input() isAI = false;
  
  constructor() { }
  
  ngOnInit(): void {
  }

}
