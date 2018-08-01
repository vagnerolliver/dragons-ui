import { Title } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';


@Injectable()
export class SystemContentService {
  constructor(
    private title: Title
  ) { }

  addTitle(title) {
    this.title.setTitle(title);
  }
}