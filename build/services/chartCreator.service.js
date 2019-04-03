"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var barChart_entity_1 = require("../entities/barChart.entity");
var ChartCreatorService = /** @class */ (function () {
    function ChartCreatorService() {
    }
    ChartCreatorService.prototype.ngOnInit = function () {
    };
    //TODO: charttype enum
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
    ChartCreatorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ChartCreatorService);
    return ChartCreatorService;
}());
exports.ChartCreatorService = ChartCreatorService;
//# sourceMappingURL=chartCreator.service.js.map