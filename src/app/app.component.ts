import { Component, OnInit } from '@angular/core';
import { format, formatDistance } from 'date-fns';
import { Configuration, ChatCompletionRequestMessage, OpenAIApi } from 'openai';
import { environment } from 'src/environments/environment';

const configuration = new Configuration({
  apiKey: environment.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ChatMessage {
  text: any;
  date: string;
  isAI: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  
  ngOnInit(): void {
    openai.listModels().then(a => {
      console.log(a)
    })
  }

  title = "Open AI App Demo";

  messages: ChatMessage[] = [];

  async sendMessage(input: any) {
    console.log(input.value)
    input = input.value as ChatCompletionRequestMessage;

    var completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages:  [{
        role: 'user',
        content: input
      }],
    });

    console.log(completion.data.choices[0].message?.content);

    await this.messages.push(
      {
        text: input,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: false
      },
    )
    await this.messages.push(
      {
        text: completion.data.choices[0].message?.content,
        date: formatDistance(Date.now(),  new Date(Date.now()), { addSuffix: true }),
        isAI: true
      },
    )

    input.value = '';
  }
}