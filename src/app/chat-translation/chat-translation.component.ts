import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-translation',
  templateUrl: './chat-translation.component.html',
  styleUrls: ['./chat-translation.component.scss']
})
export class ChatTranslationComponent implements OnInit {
  @Input() filename = '';
  @Input() message = '';
  @Input() date = '';
  @Input() isAI = false;

  constructor() { }

  ngOnInit(): void {
  }

}
