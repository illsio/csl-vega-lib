"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var xml2js = require("xml2js/lib/xml2js");
var WfsDataUtils = /** @class */ (function () {
    function WfsDataUtils() {
        this.baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];
    }
    WfsDataUtils.prototype.getPromise = function (data) {
        var parser = new xml2js.Parser();
        return new Promise(function (resolve, reject) {
            parser.parseString(data, function (err, result) {
                resolve(result);
            });
        });
    };
    /*
    *   These methods extract data from a WFS without the necessity of displaying a map-component
    *   Used in the wfs-dataload.component
    */
    WfsDataUtils.prototype.getDataFromWFSJson = function (wfsData, wfsTypename, properties, prefix) {
        var newWfs = wfsData;
        for (var _i = 0, _a = this.baseNodes; _i < _a.length; _i++) {
            var baseNodes = _a[_i];
            newWfs = newWfs[baseNodes];
        }
        // At this point we should have an array of data elements
        var dataCollection = [];
        var dataIndex = 0;
        for (var _b = 0, newWfs_1 = newWfs; _b < newWfs_1.length; _b++) {
            var dataElement = newWfs_1[_b];
            var data = {};
            for (var _c = 0, properties_1 = properties; _c < properties_1.length; _c++) {
                var prop = properties_1[_c];
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
    };
    WfsDataUtils = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], WfsDataUtils);
    return WfsDataUtils;
}());
exports.WfsDataUtils = WfsDataUtils;
//# sourceMappingURL=wfs-data.utils.js.map