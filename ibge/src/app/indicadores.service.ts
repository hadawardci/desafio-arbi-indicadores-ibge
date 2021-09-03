import { SystemConstants } from './systemconstants';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IIndicador } from './model/indicador';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {
  http: HttpClient;
  baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  listar(): Observable<IIndicador[]> {
    return this.http.get<IIndicador[]>(this.baseUrl + 'paises/indicadores/');
  }

  listarPorPais(paises: string[], indicador: number): Observable<IIndicador[]> {
    const urlPaises = paises.reduce((list, item) => list + '%7C' + item);
    //const urlIndicadores = paises.reduce((list, item) => list + '%7C' + item);
    console.log(urlPaises, indicador);
    return this.http.get<IIndicador[]>(`${this.baseUrl}paises/${urlPaises}/indicadores/${indicador}`);
  }


}

