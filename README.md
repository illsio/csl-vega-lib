D3-Vega JSON Library
========

Created 03.04.2019

- This Module is designed to create the JSON that is necessary to create Vega Charts
- It constists of a Request Utils that sofar extracts data from WFS or GeoJSON sources (to be extended ...)
- It contains a utilities class for filtering and formatting data 
- This Module is frontend agnostic - any standard JavaScript frontend should work with this library

- NOTE: It is so far a showcase that is supposed to showcase how one library might be used in the CityScienceLab and in the context of the masterportal

This could be a potential call to the Module from an Angular context:

```
    let rawData = null;
    this.dataRequestUtils.getResponseData("SomeWFS").then(
      data => {
        rawData = data;
      },
      error => {
        console.log('cant load chart data: ' + error);
      }
    );
    let wfsData = this.dataRequestUtils.getDataFromGeoJson(data, wfsName, this.wfsStatGebProperties, this.prefix);
    let areaYearlyData = DataFormatUtils.filterDataByValues(wfsData, 'STATGEB', [String(stat.name)],       FilterTypeEnum.MATCHING);

    const chartConfig: object = {
      'height': 480,
      'width': 450,
    };

    // Totals chart
    const totalsChart = {
      'Insgesamt': 'Total',
      'unter6J': '< 6 Y',
      'unter18J': '< 18 Y'
    };

    const dataForTotalsChart: object[] = this.getDataForColumns(totalsChart, areaYearlyData);
    let lineConfigTotals: object = {
      'isMultipleYValues': true,
      'lineConfig': ['Seriesname', 'Jahr'],
      'yValues': Object.keys(totalsChart)
    };

    this.statisticalAreaTotals = ChartCreatorService.createChart('lineChart', dataForTotalsChart,
      chartConfig, null, lineConfigTotals);
  ```
