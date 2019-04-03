import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export declare class DataLoaderService implements OnInit {
    private _http;
    constructor(_http: HttpClient);
    ngOnInit(): void;
    getDataObservable(url: string): Promise<any>;
    private handleError;
    getPlain(JSONUrl: string): Observable<string>;
    getPlainRequestTest(JSONUrl: string): Observable<Object>;
    getJsonTest(JSONUrl: string): Observable<Object>;
    getTextTest(textUrl: string): Observable<string>;
    getPlainHeroku(url: string): Observable<string>;
    getContextUrl(currentUrl: string): "http://localhost:8080" | "https://hub-backend.herokuapp.com";
    getCSVData(csvUrl: string): Observable<string>;
    getNumberOfFeatures(wfsUrl: string): Observable<string>;
}
