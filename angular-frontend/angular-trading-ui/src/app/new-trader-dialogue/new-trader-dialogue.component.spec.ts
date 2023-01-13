import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTraderDialogueComponent } from './new-trader-dialogue.component';

describe('NewTraderDialogueComponent', () => {
  let component: NewTraderDialogueComponent;
  let fixture: ComponentFixture<NewTraderDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTraderDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTraderDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
