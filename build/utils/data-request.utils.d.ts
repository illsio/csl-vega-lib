export declare class DataRequestUtils {
    baseNodes: string[][];
    getResponseData(url: string): Promise<any>;
    convertToJson(data: any): Promise<{}>;
    getDataFromGeoJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[];
    getDataFromWFSJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[];
    private getFeatureNode;
}
