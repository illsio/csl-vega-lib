"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var barChart_entity_1 = require("../entities/barChart.entity");
var ChartCreatorService = /** @class */ (function () {
    function ChartCreatorService() {
    }
    //TODO: charttype enum?
    ChartCreatorService.createChart = function (chartType, chartData, countElementName) {
        if (chartType === 'barChart') {
            var charBart = new barChart_entity_1.BarchartEntity();
            charBart.countElementName = countElementName;
            charBart.colorElementName = countElementName;
            charBart.createData(chartData);
            // charBart.setDefaultData();
            return charBart.createChart();
        }
    };
    return ChartCreatorService;
}());
exports.ChartCreatorService = ChartCreatorService;
//# sourceMappingURL=chartCreator.service.js.map