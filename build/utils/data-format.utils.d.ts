import { FilterTypeEnum } from '../enums/filter-type.enum';
export declare class DataFormatUtils {
    private _allFilterSelectedValues;
    filterIdentities: string[];
    originalData: any;
    static getUniqueSeriesNames(data: object[], seriesIdent: string[]): any[];
    private static getElementNameAtLevel;
    createNewSelectionList(selectedElements: string[]): void;
    static filterDataByValues(data: object[], attribute: string, values: string[], type: FilterTypeEnum): object[];
    calculateFilteredRawData(): void;
    static sumNumberedData(data: object[], property: string): number;
    getFilterIdentityAndValue(selectedElement: string): string[];
    private getFilterHierarchyMap;
    readonly allFilterSelectedValues: string[];
    setAllFiltersSelected(newAllFiltersList: any): void;
    selectOrDeselectValue(toChangeFilter: any): void;
    static concatAllElements(textArr: string[]): string;
    static capitalize(value: any): string;
}
