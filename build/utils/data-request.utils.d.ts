export declare class DataRequestUtils {
    baseNodes: string[];
    getDataObservable(url: string): Promise<any>;
    getPromise(data: any): Promise<{}>;
    getDataFromWFSJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[];
}
