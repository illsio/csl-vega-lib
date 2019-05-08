import {BarchartEntity} from "../entities/barChart.entity";
import {LineChartEntity} from "../entities/lineChart.entity";

export class ChartCreatorService {

    public static createChart(chartType: string, chartData: Object, chartConfig: object, barCountElement?: string, lineConfig?: object): any {
        switch (chartType) {
            case 'barChart' :
                const charBart = new BarchartEntity();
                charBart.processChartConfig(chartConfig);
                charBart.countElementName = barCountElement ? barCountElement : '';
                charBart.colorElementName = barCountElement ? barCountElement : '';
                charBart.createData(chartData);
                return charBart.createChart();
            case 'lineChart' :
                const charLine = new LineChartEntity();
                charLine.processChartConfig(chartConfig);

                if (lineConfig) {
                    if (lineConfig['isMultipleYValues']) {
                        let configData: any = lineConfig['lineConfig'];
                        charLine.category = configData[0];
                        charLine.xAxisValue = configData[1];
                        charLine.yAxisMultiple = lineConfig['yValues'];

                        //Just for the axis name
                        charLine.yAxisValue = "yAxisName";
                    }

                    if (lineConfig['isSimpleLine']) {
                        let configData: string[] = lineConfig['lineConfig'];
                        charLine.category = configData[0];
                        charLine.xAxisValue = configData[1];
                        charLine.yAxisValue = configData[2];
                    }

                    if (lineConfig.hasOwnProperty('aggregate')) {
                        charLine.aggregate = lineConfig['aggregate'];
                    }

                    if (lineConfig.hasOwnProperty('filter')) {
                        charLine.filter = lineConfig['filter'];
                    }
                }

                charLine.createData(chartData);

                return charLine.createChart();
        }
    }

    /*
    *   Example configs
    */

    // const aggregate = {
    //   "type": "joinaggregate",
    //   "groupby": [category, xAxis],
    //   "fields": [yAxis],
    //   "ops": ["sum"],
    //   "as": [yAxis]
    // };
    //
    // const filter = {
    //   "type": "filter",
    //   "expr": 'STATGEB == ' + stat.name
    // };
    //
    // let lineConfig: object = {
    //   'isSimpleLine': true,
    //   'lineConfig': [category, xAxis, yAxis],
    //   'aggregate': aggregate,
    //   'filter': filter
    // };

}
