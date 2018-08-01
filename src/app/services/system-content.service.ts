import { Title } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class SystemContentService {
  constructor(
    private title: Title,
    @Inject(DOCUMENT) public document: any
  ) { }

  addTitle(title) {
    this.title.setTitle(title);
  }
}