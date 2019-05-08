import {AbstractChartEnity} from './abstractChart.enity';

export class LineChartEntity extends AbstractChartEnity {

    xAxisValue: any;
    yAxisValue: any;
    category: any;

    yAxisMultiple: any;

    filter: any = null;
    aggregate: any = null;

    public createChart() {
        const lineChart = {};
        lineChart["$shema"] = this.shema ? this.shema : null;
        lineChart["width"] = this.width > 0 ? this.width : null;
        lineChart["height"] = this.height > 0 ? this.height : null;
        lineChart["autosize"] = this.autoSize ? this.autoSize : null;

        lineChart["signals"] = this.createSignals();
        lineChart["scales"] = this.createScales();
        lineChart["axes"] = this.createAxes();
        lineChart["marks"] = this.createMarks();
        lineChart["legends"] = this.createLegends();
        lineChart["data"] = this.data;
        return lineChart;
    }

    public createData(values: Object) {
        if (this.aggregate) {
            this.data = [
                {
                    "name": "table",
                    "values": values,
                    "transform": [
                        {
                            "type": "collect",
                            "sort": {
                                "field": this.xAxisValue
                            }
                        },
                        this.aggregate
                    ]
                }
            ];
        } else if (this.filter) {
            this.data = [
                {
                    "name": "table",
                    "values": values,
                    "transform": [
                        {
                            "type": "collect",
                            "sort": {
                                "field": this.xAxisValue
                            }
                        },
                        this.aggregate
                    ]
                }
            ];
        } else {
            this.data = [
                {
                    "name": "table",
                    "values": values,
                    "transform": [
                        {
                            "type": "collect",
                            "sort": {
                                "field": this.xAxisValue
                            }
                        }
                    ]
                }
            ];
        }
    }

    private createSignals() {
        return [
            {
                "name": "interpolate",
                "value": "linear"
            },
            {
                "name": "signal_tooltip",
                "on": [
                    {"events": "*:click", "update": "warn(datum)"}
                ]
            }
        ]
    }

    private createAxes() {
        return [
            {
                "orient": "bottom",
                "scale": this.xAxisValue,
                "labelFontSize": this.fontSize,
                "labelFont": this.labelFont,

            },
            {
                "orient": "left",
                "scale": this.yAxisValue,
                "labelFontSize": this.fontSize,
                "labelFont": this.labelFont,
            }
        ]
    }

    private createScales() {
        return [
            {
                "name": this.xAxisValue,
                "type": "point",
                "range": "width",
                "domain": {"data": "table", "field": this.xAxisValue}
            },
            {
                "name": this.yAxisValue,
                "type": "linear",
                "range": "height",
                "nice": true,
                "domain": (this.yAxisMultiple && this.yAxisMultiple.length > 0) ?
                    {"data": "table", "fields": this.yAxisMultiple}
                    :
                    {"data": "table", "field": this.yAxisValue}
            },
            {
                "name": "color",
                "type": "ordinal",
                "range": "category",
                "domain": {"data": "table", "field": this.category}
            }
        ]
    }

    private createLegends() {
        return [
            {
                "fill": "color",
                "orient": "right",
                "encode": {
                    "symbols": {"enter": {"fillOpacity": {"value": 0.5}}}
                },
                "labelFontSize": this.fontSize,
                "labelFont": this.labelFont
            }
        ]

    }

    private createMarks() {
        let marks;
        if (this.yAxisMultiple && this.yAxisMultiple.length > 0) {
            marks = [];
            for (let key of this.yAxisMultiple) {
                marks.push(this.getMarksDefinition(key));
            }
        } else {
            marks = this.getMarksDefinition();
        }

        return [
            {
                "type": "group",
                "from": {
                    "facet": {
                        "name": "series",
                        "data": "table",
                        "groupby": this.category
                    }
                },
                "marks":
                    Array.isArray(marks) ? marks : [marks]

            }
        ]
    }

    private getMarksDefinition(key?: string): object {
        return {
            "type": "line",
            "key": key ? key : "",
            "from": {"data": "series"},
            "encode": {
                "enter": {
                    "x": {"scale": this.xAxisValue, "field": this.xAxisValue},
                    "y": {"scale": this.yAxisValue, "field": key ? key : this.yAxisValue},
                    "stroke": {"scale": "color", "field": this.category},
                    "strokeWidth": {"value": 2}
                }
            }
        }
    }


}
