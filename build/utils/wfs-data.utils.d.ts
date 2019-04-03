export declare class WfsDataUtils {
    baseNodes: string[];
    getPromise(data: any): Promise<{}>;
    getDataFromWFSJson(wfsData: Object[], wfsTypename: string, properties: string[], prefix: string): Object[];
}
