import {BarchartEntity} from "../entities/barChart.entity";

export class ChartCreatorService  {

  //TODO: charttype enum

  public static createChart(chartType: string, chartData: Object, countElementName: string): any {
    if (chartType === 'barChart') {
      const charBart = new BarchartEntity();
      charBart.countElementName = countElementName;
      charBart.colorElementName = countElementName;
      charBart.createData(chartData);
      // charBart.setDefaultData();

      return charBart.createChart();
    }
  }
}
