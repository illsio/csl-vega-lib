import { AbstractChartEnity } from "./abstractChart.enity";
export declare class BarchartEntity extends AbstractChartEnity {
    constructor();
    createChart(): any;
    createData(values: Object): void;
    private createSignals;
    private createScales;
    private createMarks;
    setDefaultData(): ({
        "name": string;
        "values": {
            "assigneeId": number;
            "assignee": string;
            "ipcId": number;
            "ipcs": string;
            "records": number;
            "strength": number;
        }[];
        "source"?: undefined;
        "transform"?: undefined;
    } | {
        "name": string;
        "source": string;
        "transform": {
            "type": string;
            "groupby": string[];
            "fields": string[];
            "ops": string[];
            "as": string[];
        }[];
        "values"?: undefined;
    } | {
        "name": string;
        "source": string;
        "transform": ({
            "type": string;
            "from": string;
            "key": string;
            "values": string[];
            "fields": string[];
            "field"?: undefined;
            "sort"?: undefined;
        } | {
            "type": string;
            "field": string;
            "sort": boolean;
            "from"?: undefined;
            "key"?: undefined;
            "values"?: undefined;
            "fields"?: undefined;
        })[];
        "values"?: undefined;
    })[];
}
