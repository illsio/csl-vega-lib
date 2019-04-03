import * as xml2js from 'xml2js/lib/xml2js';

export class WfsDataUtils {

  baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];

  public getPromise(data) {
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


  public getDataFromWFSJson(wfsData: Object[], wfsTypename: string, properties: string[], prefix: string): Object[] {
    let newWfs = wfsData;
    for (let baseNodes of this.baseNodes) {
      newWfs = newWfs[baseNodes];
    }
    // At this point we should have an array of data elements
    let dataCollection: Object[] = [];
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
}
