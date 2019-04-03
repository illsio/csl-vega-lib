"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    return WfsDataUtils;
}());
exports.WfsDataUtils = WfsDataUtils;
//# sourceMappingURL=wfs-data.utils.js.map