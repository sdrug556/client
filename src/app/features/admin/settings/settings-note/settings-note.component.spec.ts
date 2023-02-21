import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNoteComponent } from './settings-note.component';

describe('SettingsNoteComponent', () => {
  let component: SettingsNoteComponent;
  let fixture: ComponentFixture<SettingsNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
