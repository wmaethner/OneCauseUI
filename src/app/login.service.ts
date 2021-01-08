import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    var dateTime = new Date();
    var timestamp = String(dateTime.getHours()).padStart(2, "0") + String(dateTime.getMinutes()).padStart(2, "0");
    var hash = sha256(username + password);
    var hashStr = Base64.stringify(hash);
    return this.httpClient.post(environment.apiEndpoint + '/login', {
      token: timestamp,
      hash: hashStr,
    });
  }
}

export class Credentials {
  hash: string;
  timestamp: string;
}
