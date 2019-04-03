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
        if (this.countElementName) {
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
                "name": "dings", "value": this.colorElementName
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
                        "fill": { "scale": "color", "field": this.colorElementName },
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
                    "update": { "fill": { "scale": "color", "field": this.colorElementName } },
                    "hover": { "fill": { "value": "pink" } }
                }
            }
        ];
    };
    // Marks from previous chart
    /*{
       "name": "mark",
       "type": "arc",
       "interactive": true,
       "from": {"data": "table"},
       "encode": {
         "enter": {
           "fill": {"scale": "color", "field": "assignee"},
           "x": {"signal": "width / 2"},
           "y": {"signal": "height / 2"}
         },
         "update": {
           "tooltip": [
             {
               "test": "(selected.assignee === datum.assignee)",
               "signal": "datum.ipcs + (datum.records ? ', ' + datum.records + ' records' : '')"
             },
             {"signal": "datum.assignee + (datum.records_total ? ', ' + datum.records_total + ' records' : '')"}
           ],
           "startAngle": {"field": "startAngle"},
           "endAngle": {"field": "endAngle"},
           "stroke": [
             {"test": "(selected.assignee === datum.assignee)", "value": "white"},
             {"scale": "color", "field": "assignee"}
           ],
           "strokeOpacity": [
             {"test": "!selected && !hovered || (hovered.assignee===datum.assignee)", "value": 1.0},
             {"value": 0.0}
           ],
           "padAngle": [
             {"test": "(selected.assignee !== datum.assignee)", "value": 0.0},
             {"value": 0.01}
           ],
           "innerRadius": {"signal": "width/4"},
           "outerRadius": {"signal": "width / 2"},
           "cornerRadius": {"value": 0},
           "fill": [
             {"scale": "color", "field": "assignee"}
           ],
           "fillOpacity": [
             {"test": "(!hovered && !selected) || (hovered.assignee === datum.assignee)", "value": 1.0},
             {"test": "(selected.assignee === datum.assignee)", "signal": "datum.records", "mult": 0.01},
             {"value": 0.25}
           ]
         },
         "hover": {}
       }
     }*/
    // Deprecated???
    BarchartEntity.prototype.setDefaultData = function () {
        return [
            {
                "name": "table",
                "values": [
                    {
                        "assigneeId": 1,
                        "assignee": "Samsung",
                        "ipcId": 1,
                        "ipcs": "Biocompatible crosslinked polymer preparation but with some new keywords as this is IPC number 11.",
                        "records": 28,
                        "strength": 87
                    },
                    {
                        "assigneeId": 1,
                        "assignee": "Samsung",
                        "ipcId": 2,
                        "ipcs": "New biocompatible polyhydroxyalkanoate -  having a controlled degradation rate of less  than one year under physiological conditions.",
                        "records": 58,
                        "strength": 77
                    },
                    {
                        "assigneeId": 1,
                        "assignee": "Samsung",
                        "ipcId": 3,
                        "ipcs": "Elastic substantially linear olefin polymers  with processability similar to high branched  LDPE but strength and toughness of LLDPE.",
                        "records": 34,
                        "strength": 24
                    },
                    {
                        "assigneeId": 1,
                        "assignee": "Samsung",
                        "ipcId": 4,
                        "ipcs": "Elastic substantially linear olefin polymers  with processability similar to high branched  LDPE but strength and toughness of LLDPE.",
                        "records": 89,
                        "strength": 111
                    },
                    {
                        "assigneeId": 1,
                        "assignee": "Samsung",
                        "ipcId": 5,
                        "ipcs": "Processability similar to high branched  LDPE but strength.",
                        "records": 55,
                        "strength": 78
                    },
                    {
                        "assigneeId": 2,
                        "assignee": "Sony",
                        "ipcId": 6,
                        "ipcs": "New biocompatible polyhydroxyalkanoate -  having a controlled degradation rate of less  than one year under physiological conditions.",
                        "records": 55,
                        "strength": 55
                    },
                    {
                        "assigneeId": 2,
                        "assignee": "Sony",
                        "ipcId": 7,
                        "ipcs": "Elastic substantially linear olefin polymers  with processability similar to high branched  LDPE but strength and toughness of LLDPE.",
                        "records": 43,
                        "strength": 43
                    },
                    {
                        "assigneeId": 3,
                        "assignee": "Motorola",
                        "ipcId": 8,
                        "ipcs": "Biocompatible crosslinked polymer  preparation by nucleophilic-electrophilic  group reaction between functional polymer  and crosslinking agent, useful e.g. for  preventing surgical adhesions or for drug  delivery.",
                        "records": 91,
                        "strength": 91
                    },
                    {
                        "assigneeId": 4,
                        "assignee": "Apple",
                        "ipcId": 9,
                        "ipcs": "Ethylene polymer, partic. substantially linear  ethylene polymer has melt flow ratio of at least  5.63, mol. wt. distribution of 1.5-2.5, greater  critical shear stress than similar polymers and  had improved processability.",
                        "records": 81,
                        "strength": 81
                    },
                    {
                        "assigneeId": 4,
                        "assignee": "Apple",
                        "ipcId": 10,
                        "ipcs": "Elastic substantially linear olefin polymers  with processability similar to high branched  LDPE but strength and toughness of LLDPE.",
                        "records": 53,
                        "strength": 53
                    },
                    {
                        "assigneeId": 4,
                        "assignee": "Apple",
                        "ipcId": 11,
                        "ipcs": "Processability similar to high branched  LDPE but strength.",
                        "records": 19,
                        "strength": 19
                    },
                    {
                        "assigneeId": 4,
                        "assignee": "Apple",
                        "ipcId": 12,
                        "ipcs": "Biocompatible crosslinked polymer  preparation",
                        "records": 87,
                        "strength": 28
                    },
                    {
                        "assigneeId": 2,
                        "assignee": "Sony",
                        "ipcId": 13,
                        "ipcs": "Biocompatible crosslinked polymer  preparation",
                        "records": 67,
                        "strength": 90
                    }
                ]
            },
            {
                "name": "data_group_sum",
                "source": "table",
                "transform": [
                    {
                        "type": "aggregate",
                        "groupby": ["assigneeId"],
                        "fields": ["records"],
                        "ops": ["sum"],
                        "as": ["records_total"]
                    }
                ]
            },
            {
                "name": "finalData",
                "source": "table",
                "transform": [
                    {
                        "type": "lookup",
                        "from": "data_group_sum",
                        "key": "assigneeId",
                        "values": ["records_total"],
                        "fields": ["assigneeId"]
                    },
                    {
                        "type": "pie",
                        "field": "assigneeId",
                        "sort": true
                    }
                ]
            }
        ];
    };
    return BarchartEntity;
}(abstractChart_enity_1.AbstractChartEnity));
exports.BarchartEntity = BarchartEntity;
//# sourceMappingURL=barChart.entity.js.map