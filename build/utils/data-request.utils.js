"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xml2js = require("xml2js/lib/xml2js");
var p = require("xml2js/lib/parser");
var DataRequestUtils = /** @class */ (function () {
    function DataRequestUtils() {
        /*
        *   Extract data from a WFS without the necessity of displaying a map-component
        */
        // The baseNodes are needed when no clean JSON is returned by the WFS
        this.baseNodes = [
            ['wfs:FeatureCollection', 'gml:featureMember'],
            ['wfs:FeatureCollection', 'wfs:member']
        ];
    }
    DataRequestUtils.prototype.getResponseData = function (url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response);
                }
                else {
                    reject(xhr.statusText);
                }
            };
            xhr.onerror = function () { return reject(xhr.statusText); };
            xhr.send(null);
        });
        // In plain Angular we would simply do this
        // return this._http.get(url)
        //   .toPromise()
        //   .then(data => {
        //     return data;
        //   });
    };
    DataRequestUtils.prototype.convertToJson = function (data) {
        data = data.toString().replace("\ufeff", "");
        data = data.toString('utf8');
        var parser = new xml2js.Parser();
        return new Promise(function (resolve, reject) {
            p.parseString(data, { trim: true }, function (err, result) {
                resolve(result);
            });
        });
    };
    DataRequestUtils.prototype.getDataFromGeoJson = function (wfsData, wfsTypename, properties, prefix) {
        var dataCollection = [];
        var dataIndex = 0;
        for (var _i = 0, _a = wfsData["features"]; _i < _a.length; _i++) {
            var feature = _a[_i];
            var data = feature["properties"];
            if (!data.hasOwnProperty('id')) {
                data['id'] = dataIndex;
            }
            dataCollection.push(data);
            dataIndex++;
        }
        return dataCollection;
    };
    DataRequestUtils.prototype.getDataFromWFSJson = function (wfsData, wfsTypename, properties, prefix) {
        var newWfs = this.getFeatureNode(wfsData);
        var dataCollection = [];
        var dataIndex = 0;
        for (var _i = 0, newWfs_1 = newWfs; _i < newWfs_1.length; _i++) {
            var dataElement = newWfs_1[_i];
            var data = {};
            for (var _a = 0, properties_1 = properties; _a < properties_1.length; _a++) {
                var prop = properties_1[_a];
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
    DataRequestUtils.prototype.getFeatureNode = function (wfsData) {
        var newWfs = wfsData;
        for (var _i = 0, _a = this.baseNodes; _i < _a.length; _i++) {
            var baseNode = _a[_i];
            newWfs = wfsData;
            for (var _b = 0, baseNode_1 = baseNode; _b < baseNode_1.length; _b++) {
                var node = baseNode_1[_b];
                newWfs = newWfs[node];
            }
            if (newWfs && newWfs.hasOwnProperty("length")) {
                return newWfs;
            }
        }
        return newWfs;
    };
    return DataRequestUtils;
}());
exports.DataRequestUtils = DataRequestUtils;
//# sourceMappingURL=data-request.utils.js.map