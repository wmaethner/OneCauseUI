import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  redirectToUrl(url: string) {
    this.document.location.href = url;
  }
}
