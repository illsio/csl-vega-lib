var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js/lib/xml2js';
let WfsDataUtils = class WfsDataUtils {
    constructor() {
        this.baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];
    }
    getPromise(data) {
        let parser = new xml2js.Parser();
        return new Promise((resolve, reject) => {
            parser.parseString(data, function (err, result) {
                resolve(result);
            });
        });
    }
    /*
    *   These methods extract data from a WFS without the necessity of displaying a map-component
    *   Used in the wfs-dataload.component
    */
    getDataFromWFSJson(wfsData, wfsTypename, properties, prefix) {
        let newWfs = wfsData;
        for (const baseNodes of this.baseNodes) {
            newWfs = newWfs[baseNodes];
        }
        // At this point we should have an array of data elements
        let dataCollection = [];
        let dataIndex = 0;
        for (let dataElement of newWfs) {
            let data = {};
            for (let prop of properties) {
                if (dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop]) {
                    data[prop] = dataElement[prefix + ':' + wfsTypename][0][prefix + ':' + prop][0];
                }
            }
            // Adding an ID
            if (!data.hasOwnProperty('id')) {
                data['id'] = dataIndex;
            }
            // Adding attribute for counting elements if no real value is available
            dataCollection.push(data);
            dataIndex++;
        }
        return dataCollection;
    }
};
WfsDataUtils = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], WfsDataUtils);
export { WfsDataUtils };
//# sourceMappingURL=wfs-data.utils.js.map