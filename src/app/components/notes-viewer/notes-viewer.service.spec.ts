import { TestBed } from '@angular/core/testing';

import { NotesViewerService } from './notes-viewer.service';

describe('NotesViewerService', () => {
  let service: NotesViewerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesViewerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
