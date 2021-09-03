import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { IPais } from './model/pais';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }
  listar(): Observable<IPais[]> {
    return this.http.get<IPais[]>(`${this.baseUrl}/paises`);
  }
}
