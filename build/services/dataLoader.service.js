"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataLoaderService = /** @class */ (function () {
    function DataLoaderService() {
    }
    /*
    *   Request data from
    */
    DataLoaderService.prototype.getDataObservable = function (url) {
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
        // return this._http.get(url)
        //   .toPromise()
        //   .then(data => {
        //     return data;
        //   });
    };
    return DataLoaderService;
}());
exports.DataLoaderService = DataLoaderService;
//# sourceMappingURL=dataLoader.service.js.map