"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstractChart_enity_1 = require("./abstractChart.enity");
var BarchartEntity = /** @class */ (function (_super) {
    __extends(BarchartEntity, _super);
    function BarchartEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarchartEntity.prototype.createChart = function () {
        var barChart = {};
        barChart["$shema"] = this.shema ? this.shema : null;
        barChart["width"] = this.width ? this.width : 500;
        barChart["height"] = this.height ? this.height : 500;
        barChart["autosize"] = this.autoSize ? this.autoSize : null;
        barChart["signals"] = this.createSignals();
        barChart["scales"] = this.createScales();
        barChart["marks"] = this.createMarks();
        barChart["data"] = this.data;
        return barChart;
    };
    BarchartEntity.prototype.createData = function (values) {
        this.data = [
            {
                "name": "table",
                "values": values
            }
        ];
        if (this.countElementName && this.countElementName.length > 0) {
            this.data[0]["transform"] =
                [
                    {
                        "type": "aggregate",
                        "groupby": [this.countElementName]
                    },
                    {
                        "type": "pie",
                        "field": "count"
                    }
                ];
        }
    };
    BarchartEntity.prototype.createSignals = function () {
        return [
            {
                "name": "startAngle", "value": 0
            },
            {
                "name": "endAngle", "value": 6.29
            },
            {
                "name": "padAngle", "value": 0
            },
            {
                "name": "innerRadius", "value": 0
            },
            {
                "name": "cornerRadius", "value": 0
            },
            {
                "name": "sort", "value": false
            },
            {
                "name": "dings", "value": this.colorElementName.length > 0 ? this.colorElementName : null
            }
        ];
    };
    BarchartEntity.prototype.createScales = function () {
        return [
            {
                "name": "color",
                "type": "ordinal",
                "range": { "scheme": this.colorScheme }
            }
        ];
    };
    BarchartEntity.prototype.createMarks = function () {
        return [
            {
                "type": "arc",
                "from": { "data": "table" },
                "encode": {
                    "enter": {
                        "fill": { "scale": "color", "field": this.colorElementName.length > 0 ? this.colorElementName : null },
                        "x": { "signal": "width / 2" },
                        "y": { "signal": "height / 2" },
                        "stroke": { "value": "#fff" },
                        "tooltip": { "signal": "item.datum" },
                        "startAngle": { "field": "startAngle" },
                        "endAngle": { "field": "endAngle" },
                        "padAngle": { "signal": "padAngle" },
                        "innerRadius": { "signal": "innerRadius" },
                        "outerRadius": { "signal": "width / 2" },
                        "cornerRadius": { "signal": "cornerRadius" }
                    },
                    "update": {
                        "fill": { "scale": "color", "field": this.colorElementName.length > 0 ? this.colorElementName : null },
                        "startAngle": { "field": "startAngle" },
                        "endAngle": { "field": "endAngle" }
                    },
                    "hover": { "fill": { "value": "pink" } }
                }
            }
        ];
    };
    return BarchartEntity;
}(abstractChart_enity_1.AbstractChartEnity));
exports.BarchartEntity = BarchartEntity;
//# sourceMappingURL=barChart.entity.js.map