import {FilterTypeEnum} from '../enums/filter-type.enum';

// FIXME: A generic DataUtils class should be agnostic of the type of the data (such as "participation")

export class DataFormatUtils {

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

  private _allFilterSelectedValues: string[] = [];
  filterIdentities: string[] = [];
  originalData;


  /*
  *   THESE ARE THE ONLY METHODS CURRENTLY USED
  */

  public static getUniqueSeriesNames(data: object[], seriesIdent: string[]): any[] {
    const seriesNames: any[] = [];
    for (const obj of data) {
      const currentSeriesName = this.getElementNameAtLevel(seriesIdent, obj);
      if (seriesNames.indexOf(currentSeriesName) === -1) {
        // It does not exist yet
        seriesNames.push(currentSeriesName);
      }
    }
    return seriesNames;
  }

  private static getElementNameAtLevel(seriesIdent: string[], obj) {
    let latestElement;
    for (const sIdent of seriesIdent) {
      latestElement = latestElement ? latestElement : obj;
      if (latestElement[sIdent] instanceof Array) {
        latestElement = latestElement[sIdent][0];
      } else {
        latestElement = latestElement[sIdent];
      }
    }

    const currentSeriesName = latestElement;
    return currentSeriesName;
  }




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

  public createNewSelectionList(selectedElements: string[]) {
    if (selectedElements && selectedElements.length > 0) {

      // First we remove all elements for this filter
      const filterIdentity = this.getFilterIdentityAndValue(selectedElements[0])[0];
      const newAllFiltersList: string[] = [];
      for (const currentListElement of this._allFilterSelectedValues) {
        if (!currentListElement.startsWith(filterIdentity)) {
          newAllFiltersList.push(currentListElement);
        }
      }

      // Now we add all from the list
      for (const newElements of selectedElements) {
        newAllFiltersList.push(newElements);
      }

      this.setAllFiltersSelected(newAllFiltersList);
    }
  }


  // Filters the data according to the filter changes - single filter changes

  public static filterDataByValues(data: object[], attribute: string, values: string[], type: FilterTypeEnum): object[] {
    const filteredData: object[] = [];
    for (const obj of data) {
      if (obj && obj.hasOwnProperty(attribute)) {
        const objValue = obj[attribute].toLocaleLowerCase();
        for (let value of values) {
          value = value.toLocaleLowerCase();
          if (type === FilterTypeEnum.MATCHING
            && objValue === value) {
            filteredData.push(obj);
            break;
          } else if (type === FilterTypeEnum.CONTAINS
            && objValue.indexOf(value) > -1) {
            filteredData.push(obj);
            break;
          }
        }

      }
    }
    return filteredData;
  }

  // Calculate data from all filters

  public calculateFilteredRawData() {
    const newRawData: Object[] = [];
    const filterHierarchyMap = this.getFilterHierarchyMap(this._allFilterSelectedValues);
    for (const rawData of this.originalData) {
      let fitForAll = true;

      for (const filterIdentity of this.filterIdentities) {
        if (filterHierarchyMap.hasOwnProperty(filterIdentity)) {
          let fitForOne = false;
          const selectedValues: string[] = filterHierarchyMap[filterIdentity];
          for (const selectedValue of selectedValues) {
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
  }

  // Returns a sum used in KIPs

  public static sumNumberedData(data: object[], property: string): number {
    let summedData = 0;
    for (const dat of data) {
      const value = Number(dat[property]);
      if (!isNaN(value)) {
        summedData += value;
      }
    }

    return summedData;
  }

  /*
  *   Misc methods
  */

  public getFilterIdentityAndValue(selectedElement: string): string[] {
    const identValue: string[] = [];
    identValue.push(selectedElement.substr(0, selectedElement.indexOf('#')));
    identValue.push(selectedElement.substr(selectedElement.indexOf('#') + 1, selectedElement.length));
    return identValue;
  }

  private getFilterHierarchyMap(allSelectedFilters: string[]) {
    const filterMap = {};
    for (const selected of allSelectedFilters) {
      const identAndValue = this.getFilterIdentityAndValue(selected);
      if (filterMap.hasOwnProperty(identAndValue[0])) {
        (filterMap[identAndValue[0]]).push(identAndValue[1]);
      } else {
        filterMap[identAndValue[0]] = [identAndValue[1]];
      }
    }
    return filterMap;
  }


  get allFilterSelectedValues(): string[] {
    return this._allFilterSelectedValues;
  }

  public setAllFiltersSelected(newAllFiltersList) {
    this._allFilterSelectedValues = newAllFiltersList;
    // TODO: Filter will not be created here anymore?
    // this._selectFilterChangeEmitter.next(this._allFilterSelectedValues);
  }

  public selectOrDeselectValue(toChangeFilter) {
    let allFilters = this._allFilterSelectedValues;
    let idx = 0;
    let found = false;
    for (const selectedFilters of allFilters) {
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

    const newFilterList: string[] = [];
    for (const obj of allFilters) {
      newFilterList.push(obj);
    }
    this.setAllFiltersSelected(newFilterList.length === 0 ? [] : newFilterList);
  }

  public static concatAllElements(textArr: string[]): string {
    let concatenated = '';
    for (const text of textArr) {
      concatenated = concatenated.concat(' ' + text);
    }
    return concatenated;
  }

  public static capitalize(value: any): string {
    let stringValue = '';
    if (value instanceof Array) {
      stringValue = value[0].name;
    } else if (typeof value === 'object') {
      stringValue = value.name[0];
    } else {
      stringValue = value.name;
    }

    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  }
}
