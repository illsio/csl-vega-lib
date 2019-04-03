import { OnInit } from '@angular/core';
export declare class ChartCreatorService implements OnInit {
    constructor();
    ngOnInit(): void;
    static createChart(chartType: string, chartData: Object, countElementName: string): any;
}
