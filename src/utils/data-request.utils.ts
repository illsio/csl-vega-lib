import * as xml2js from 'xml2js/lib/xml2js';

export class DataRequestUtils {

  /*
  *   Extract data from a WFS without the necessity of displaying a map-component
  */


  // The baseNodes are needed when no clean JSON is returned by the WFS
  baseNodes = ['wfs:FeatureCollection', 'gml:featureMember'];

  getDataObservable(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open( "GET", url);
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(null);
    });

    // In plain Angular we would simply do this
    // return this._http.get(url)
    //   .toPromise()
    //   .then(data => {
    //     return data;
    //   });
  }

  public getPromise(data) {
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      parser.parseString(data, function (err, result) {
        resolve(result);
      });
    });
  }

  public getDataFromWFSJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[] {
    let newWfs = wfsData;
    for (const baseNodes of this.baseNodes) {
      newWfs = newWfs[baseNodes];
    }
    // At this point we should have an array of data elements
    const dataCollection: object[] = [];
    let dataIndex = 0;
    for (const dataElement of newWfs) {
      const data = {};
      for (const prop of properties) {
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
