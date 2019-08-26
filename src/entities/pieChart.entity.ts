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

        if (this.dataElementName && this.dataElementName.length > 0) {
            this.data[0].transform = [
                {
                    "type": "pie",
                    "field": this.dataElementName,
                    "startAngle": {"signal": "startAngle"},
                    "endAngle": {"signal": "endAngle"},
                    "sort": {"signal": "sort"}
                }
            ];
        } else if (this.countElementName && this.countElementName.length > 0) {
            this.data[0].transform = [
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

}
