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
        barChart["axes"] = this.createAxes();
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
    }

    private createSignals() {
        return [
            {
                "name": "tooltip",
                "value": {},
                "on": [
                    {"events": "rect:mouseover", "update": "datum"},
                    {"events": "rect:mouseout",  "update": "{}"}
                ]
            }
        ]
    }

    private createScales() {
        return [
            {
                "name": "xscale",
                "type": "band",
                "domain": {"data": "table", "field": this.colorElementName},
                "range": "width",
                "padding": 0.05,
                "round": true
            },
            {
                "name": "yscale",
                "domain": {"data": "table", "field": this.dataElementName},
                "nice": true,
                "range": "height"
            }
        ];
    }

    private createAxes() {
        return [
            { "orient": "bottom", "scale": "xscale" },
            { "orient": "left", "scale": "yscale" }
        ];
    };

    private createMarks() {
        return [
            {
                "type": "rect",
                "from": {"data":"table"},
                "encode": {
                    "enter": {
                        "x": {"scale": "xscale", "field": this.colorElementName},
                        "width": {"scale": "xscale", "band": 1},
                        "y": {"scale": "yscale", "field": this.dataElementName},
                        "y2": {"scale": "yscale", "value": 0}
                    },
                    "update": {
                        "fill": {"value": "steelblue"}
                    },
                    "hover": {
                        "fill": {"value": "red"}
                    }
                }
            },
            {
                "type": "text",
                "encode": {
                    "enter": {
                        "align": {"value": "center"},
                        "baseline": {"value": "bottom"},
                        "fill": {"value": "#333"}
                    },
                    "update": {
                        "x": {"scale": "xscale", "signal": "tooltip."+this.colorElementName, "band": 0.5},
                        "y": {"scale": "yscale", "signal": "tooltip."+this.dataElementName, "offset": -2},
                        "text": {"signal": "tooltip."+this.dataElementName},
                        "fillOpacity": [
                            {"test": "datum === tooltip", "value": 0},
                            {"value": 1}
                        ]
                    }
                }
            }
        ];
    }
}
