import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  @Input() defaultImg?: string;

  @Input() img?: string;

  @Input() allowEditing = true;

  @Input() allowDeleting = true;

  @Output() onImageChanged = new EventEmitter<File>();

  constructor() {}

  ngOnInit(): void {}

  fileChanged(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files?.length) {
    }
  }

  edit(): void {
    this.fileInput?.nativeElement.click();
  }

  delete(): void {}
}
