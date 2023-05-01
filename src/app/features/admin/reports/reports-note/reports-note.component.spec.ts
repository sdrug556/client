import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsNoteComponent } from './reports-note.component';

describe('ReportsNoteComponent', () => {
  let component: ReportsNoteComponent;
  let fixture: ComponentFixture<ReportsNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
