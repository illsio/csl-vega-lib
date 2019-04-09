"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filter_type_enum_1 = require("../enums/filter-type.enum");
// FIXME: A generic DataUtils class should be agnostic of the type of the data (such as "participation")
var DataFormatUtils = /** @class */ (function () {
    function DataFormatUtils() {
        //@Deprecated
        //This was the way to commmunicate Data/Filter changes from the dashboard-module to the embedded context
        /*
          private _rawDataChangeEmitter = new BehaviorSubject<object[]>([]);
          rawDataChangeEmitter$ = this._rawDataChangeEmitter.asObservable();
        
        
          private _selectFilterChangeEmitter = new BehaviorSubject<object[]>([]);
          selectFilterChangeEmitter$ = this._selectFilterChangeEmitter.asObservable();
        */
        /*
        *   For the current data - the current filter restrictions
        */
        this._allFilterSelectedValues = [];
        this.filterIdentities = [];
    }
    /*
    *   THESE ARE THE ONLY METHODS CURRENTLY USED
    */
    DataFormatUtils.getUniqueSeriesNames = function (data, seriesIdent) {
        var seriesNames = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            var currentSeriesName = this.getElementNameAtLevel(seriesIdent, obj);
            if (seriesNames.indexOf(currentSeriesName) === -1) {
                // It does not exist yet
                seriesNames.push(currentSeriesName);
            }
        }
        return seriesNames;
    };
    DataFormatUtils.getElementNameAtLevel = function (seriesIdent, obj) {
        var latestElement;
        for (var _i = 0, seriesIdent_1 = seriesIdent; _i < seriesIdent_1.length; _i++) {
            var sIdent = seriesIdent_1[_i];
            latestElement = latestElement ? latestElement : obj;
            if (latestElement[sIdent] instanceof Array) {
                latestElement = latestElement[sIdent][0];
            }
            else {
                latestElement = latestElement[sIdent];
            }
        }
        var currentSeriesName = latestElement;
        return currentSeriesName;
    };
    /*
    *   Communicates all the data changes to the outside
    */
    //
    // set rawDataChangeEmitter(value: any[]) {
    //   this._rawDataChangeEmitter.next(value);
    // }
    /*
    *   Data recalculation methods that should get called from everyone outside
    */
    // Adds all selekted values to allFilterSelectedValues
    DataFormatUtils.prototype.createNewSelectionList = function (selectedElements) {
        if (selectedElements && selectedElements.length > 0) {
            // First we remove all elements for this filter
            var filterIdentity = this.getFilterIdentityAndValue(selectedElements[0])[0];
            var newAllFiltersList = [];
            for (var _i = 0, _a = this._allFilterSelectedValues; _i < _a.length; _i++) {
                var currentListElement = _a[_i];
                if (!currentListElement.startsWith(filterIdentity)) {
                    newAllFiltersList.push(currentListElement);
                }
            }
            // Now we add all from the list
            for (var _b = 0, selectedElements_1 = selectedElements; _b < selectedElements_1.length; _b++) {
                var newElements = selectedElements_1[_b];
                newAllFiltersList.push(newElements);
            }
            this.setAllFiltersSelected(newAllFiltersList);
        }
    };
    // Filters the data according to the filter changes - single filter changes
    DataFormatUtils.filterDataByValues = function (data, attribute, values, type) {
        var filteredData = [];
        for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
            var obj = data_2[_i];
            if (obj && obj.hasOwnProperty(attribute)) {
                var objValue = obj[attribute].toLocaleLowerCase();
                for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
                    var value = values_1[_a];
                    value = value.toLocaleLowerCase();
                    if (type === filter_type_enum_1.FilterTypeEnum.MATCHING
                        && objValue === value) {
                        filteredData.push(obj);
                        break;
                    }
                    else if (type === filter_type_enum_1.FilterTypeEnum.CONTAINS
                        && objValue.indexOf(value) > -1) {
                        filteredData.push(obj);
                        break;
                    }
                }
            }
        }
        return filteredData;
    };
    // Calculate data from all filters
    DataFormatUtils.prototype.calculateFilteredRawData = function () {
        var newRawData = [];
        var filterHierarchyMap = this.getFilterHierarchyMap(this._allFilterSelectedValues);
        for (var _i = 0, _a = this.originalData; _i < _a.length; _i++) {
            var rawData = _a[_i];
            var fitForAll = true;
            for (var _b = 0, _c = this.filterIdentities; _b < _c.length; _b++) {
                var filterIdentity = _c[_b];
                if (filterHierarchyMap.hasOwnProperty(filterIdentity)) {
                    var fitForOne = false;
                    var selectedValues = filterHierarchyMap[filterIdentity];
                    for (var _d = 0, selectedValues_1 = selectedValues; _d < selectedValues_1.length; _d++) {
                        var selectedValue = selectedValues_1[_d];
                        if (selectedValue.indexOf(rawData[filterIdentity]) > -1
                            && rawData[filterIdentity].length > 0) {
                            fitForOne = true;
                            break;
                        }
                    }
                    if (!fitForOne) {
                        fitForAll = false;
                        break;
                    }
                }
            }
            if (fitForAll) {
                newRawData.push(rawData);
            }
        }
        // The changeEmitter communicated the filtered data to the outside
        // this.rawDataChangeEmitter = newRawData;
    };
    // Returns a sum used in KIPs
    DataFormatUtils.sumNumberedData = function (data, property) {
        var summedData = 0;
        for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
            var dat = data_3[_i];
            var value = Number(dat[property]);
            if (!isNaN(value)) {
                summedData += value;
            }
        }
        return summedData;
    };
    /*
    *   Misc methods
    */
    DataFormatUtils.prototype.getFilterIdentityAndValue = function (selectedElement) {
        var identValue = [];
        identValue.push(selectedElement.substr(0, selectedElement.indexOf('#')));
        identValue.push(selectedElement.substr(selectedElement.indexOf('#') + 1, selectedElement.length));
        return identValue;
    };
    DataFormatUtils.prototype.getFilterHierarchyMap = function (allSelectedFilters) {
        var filterMap = {};
        for (var _i = 0, allSelectedFilters_1 = allSelectedFilters; _i < allSelectedFilters_1.length; _i++) {
            var selected = allSelectedFilters_1[_i];
            var identAndValue = this.getFilterIdentityAndValue(selected);
            if (filterMap.hasOwnProperty(identAndValue[0])) {
                (filterMap[identAndValue[0]]).push(identAndValue[1]);
            }
            else {
                filterMap[identAndValue[0]] = [identAndValue[1]];
            }
        }
        return filterMap;
    };
    Object.defineProperty(DataFormatUtils.prototype, "allFilterSelectedValues", {
        get: function () {
            return this._allFilterSelectedValues;
        },
        enumerable: true,
        configurable: true
    });
    DataFormatUtils.prototype.setAllFiltersSelected = function (newAllFiltersList) {
        this._allFilterSelectedValues = newAllFiltersList;
        // TODO: Filter will not be created here anymore?
        // this._selectFilterChangeEmitter.next(this._allFilterSelectedValues);
    };
    DataFormatUtils.prototype.selectOrDeselectValue = function (toChangeFilter) {
        var allFilters = this._allFilterSelectedValues;
        var idx = 0;
        var found = false;
        for (var _i = 0, allFilters_1 = allFilters; _i < allFilters_1.length; _i++) {
            var selectedFilters = allFilters_1[_i];
            if (selectedFilters === toChangeFilter) {
                allFilters = allFilters.splice(idx + 1, 1);
                found = true;
                break;
            }
            idx++;
        }
        if (!found) {
            allFilters.push(toChangeFilter);
        }
        var newFilterList = [];
        for (var _a = 0, allFilters_2 = allFilters; _a < allFilters_2.length; _a++) {
            var obj = allFilters_2[_a];
            newFilterList.push(obj);
        }
        this.setAllFiltersSelected(newFilterList.length === 0 ? [] : newFilterList);
    };
    DataFormatUtils.concatAllElements = function (textArr) {
        var concatenated = '';
        for (var _i = 0, textArr_1 = textArr; _i < textArr_1.length; _i++) {
            var text = textArr_1[_i];
            concatenated = concatenated.concat(' ' + text);
        }
        return concatenated;
    };
    DataFormatUtils.capitalize = function (value) {
        var stringValue = '';
        if (value instanceof Array) {
            stringValue = value[0].name;
        }
        else if (typeof value === 'object') {
            stringValue = value.name[0];
        }
        else {
            stringValue = value.name;
        }
        return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
    };
    return DataFormatUtils;
}());
exports.DataFormatUtils = DataFormatUtils;
//# sourceMappingURL=data-format.utils.js.map