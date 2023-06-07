import { Component, OnInit } from '@angular/core';
import { OpenAIService } from './services/openai.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  constructor(public openAIService: OpenAIService) {
    openAIService.listModels();
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  title = "Open AI Demo";

  
}