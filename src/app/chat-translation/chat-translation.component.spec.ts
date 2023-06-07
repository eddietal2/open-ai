import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTranslationComponent } from './chat-translation.component';

describe('ChatTranslationComponent', () => {
  let component: ChatTranslationComponent;
  let fixture: ComponentFixture<ChatTranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTranslationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
