import { IIndicador } from './../model/indicador';
import { IPais } from './../model/pais';
import { IndicadoresService } from './../indicadores.service';
import { PaisesService } from './../paises.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  public indicadores: IIndicador[] | undefined;
  public indicador: IIndicador | undefined;
  public paises: IPais[] | undefined; //= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public toppings: FormControl = new FormControl();
  public lineChartData: ChartDataSets[] = [];
  // [
  //   { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'Apple' },
  //   { data: [57, 50, 75, 87, 43, 46, 37, 48, 67, 56, 70, 50], label: 'Mi' },
  // ];

  public lineChartLabels: Label[] = [];// ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartOptions = {
    responsive: true,
  };

  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  paisesService: PaisesService;
  indicadoresService: IndicadoresService;
  constructor(paisesService: PaisesService, indicadoresService: IndicadoresService) {
    this.paisesService = paisesService;
    this.indicadoresService = indicadoresService;
    this.paisesService.listar().subscribe(result => this.paises = result);
    this.indicadoresService.listar().subscribe(result => {
      this.indicador = result[0]
    });
  }

  ngOnInit(): void {
  }

  selectionChange(): void {
    console.log('indicador', this.indicador);
    this.indicadoresService.listarPorPais(this.toppings.value, this.indicador?.id ?? 0)
      .subscribe(result => {
        this.indicadores = result;
        this.chart(this.indicadores);
      });
  }
  //Object.keys(serie)

  chart(indicadores: IIndicador[]): void {
    //const items = indicadores[0].series?.length ?? 0;
    this.lineChartData = [];
    indicadores[0].series?.forEach(seriesA => {
      let data = Object.values(seriesA.serie).map((serieInner: any) => Object.values(serieInner)[0] ?? 0);
      let keys = Object.values(seriesA.serie).map((serieInner: any) => Object.keys(serieInner)[0]);
      this.setData(seriesA.pais.nome, data, keys);
    });
  }


  setData(label: string, data: any[], keys: any[]): void {

    this.lineChartLabels = keys;
    this.lineChartData.push({ label, data, });
  }

}
