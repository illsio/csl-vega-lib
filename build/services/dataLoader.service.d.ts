import { HttpClient } from '@angular/common/http';
export declare class DataLoaderService {
    private _http;
    constructor(_http: HttpClient);
    getDataObservable(url: string): Promise<any>;
    private handleError;
    getPlain(JSONUrl: string): import("rxjs").Observable<string>;
    getPlainRequestTest(JSONUrl: string): import("rxjs").Observable<Object>;
    getJsonTest(JSONUrl: string): import("rxjs").Observable<Object>;
    getTextTest(textUrl: string): import("rxjs").Observable<string>;
    getPlainHeroku(url: string): import("rxjs").Observable<string>;
    getContextUrl(currentUrl: any): "http://localhost:8080" | "https://hub-backend.herokuapp.com";
    getCSVData(csvUrl: string): import("rxjs").Observable<string>;
    getNumberOfFeatures(wfsUrl: string): import("rxjs").Observable<string>;
}
