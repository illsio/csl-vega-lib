"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var barChart_entity_1 = require("../entities/barChart.entity");
var lineChart_entity_1 = require("../entities/lineChart.entity");
var ChartCreatorService = /** @class */ (function () {
    function ChartCreatorService() {
    }
    ChartCreatorService.createChart = function (chartType, chartData, chartConfig, barCountElement, lineConfig) {
        switch (chartType) {
            case 'barChart':
                var charBart = new barChart_entity_1.BarchartEntity();
                charBart.processChartConfig(chartConfig);
                charBart.countElementName = barCountElement ? barCountElement : '';
                charBart.colorElementName = barCountElement ? barCountElement : '';
                charBart.createData(chartData);
                return charBart.createChart();
            case 'lineChart':
                var charLine = new lineChart_entity_1.LineChartEntity();
                charLine.processChartConfig(chartConfig);
                if (lineConfig) {
                    if (lineConfig['isMultipleYValues']) {
                        var configData = lineConfig['lineConfig'];
                        charLine.category = configData[0];
                        charLine.xAxisValue = configData[1];
                        charLine.yAxisMultiple = lineConfig['yValues'];
                        //Just for the axis name
                        charLine.yAxisValue = "yAxisName";
                    }
                    if (lineConfig['isSimpleLine']) {
                        var configData = lineConfig['lineConfig'];
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
    };
    return ChartCreatorService;
}());
exports.ChartCreatorService = ChartCreatorService;
//# sourceMappingURL=chartCreator.service.js.map