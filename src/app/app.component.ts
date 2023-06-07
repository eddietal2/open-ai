import { Component, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
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
  }

  title = "Open AI Demo";

  
}