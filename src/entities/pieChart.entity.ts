import {AbstractChartEnity} from './abstractChart.enity';

export class BarchartEntity extends AbstractChartEnity {

    public createChart() {
        const barChart = {};
        barChart["$shema"] = this.shema ? this.shema : null;
        barChart["width"] = this.width ? this.width : 500;
        barChart["height"] = this.height ? this.height : 500;
        barChart["autosize"] = this.autoSize ? this.autoSize : null;

        barChart["signals"] = this.createSignals();
        barChart["scales"] = this.createScales();
        barChart["marks"] = this.createMarks();
        barChart["data"] = this.data;
        return barChart;
    }

    public createData(values: Object) {
        this.data = [
            {
                "name": "table",
                "values": values
            }
        ];

        if (this.countElementName && this.countElementName.length > 0) {
            this.data[0].transform =  [
                {
                    "type": "pie",
                    "field": this.countElementName,
                    "startAngle": {"signal": "startAngle"},
                    "endAngle": {"signal": "endAngle"},
                    "sort": {"signal": "sort"}
                }
            ];
        }
    }

    private createSignals() {
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
            }
        ]
    }

    private createScales() {
        return [
            {
                "name": "color",
                "type": "ordinal",
                "domain": {"data": "table", "field": this.colorElementName},
                "range": {"scheme": this.colorScheme}
            }
        ]
    }

    private createMarks() {
        return [
            {
                "type": "arc",
                "from": {"data": "table"},
                "encode": {
                    "enter": {
                        "fill": {"scale": "color", "field": this.colorElementName.length > 0 ? this.colorElementName : null},
                        "x": {"signal": "width / 2"},
                        "y": {"signal": "height / 2"},
                        "tooltip": {"signal": "item.datum"},

                        "startAngle": {"field": "startAngle"},
                        "endAngle": {"field": "endAngle"},
                        "padAngle": {"signal": "padAngle"},
                        "innerRadius": {"signal": "innerRadius"},
                        "outerRadius": {"signal": "width / 2"},
                        "cornerRadius": {"signal": "cornerRadius"}
                    },
                    "update": {
                        "fill": {"scale": "color", "field": this.colorElementName.length > 0 ? this.colorElementName : null},
                        "startAngle": {"field": "startAngle"},
                        "endAngle": {"field": "endAngle"}
                    }
                }
            }
        ]
    }

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

}
