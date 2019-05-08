import * as xml2js from 'xml2js/lib/xml2js';
import * as p from 'xml2js/lib/parser';

export class DataRequestUtils {

  /*
  *   Extract data from a WFS without the necessity of displaying a map-component
  */


  // The baseNodes are needed when no clean JSON is returned by the WFS
  baseNodes = [
    ['wfs:FeatureCollection', 'gml:featureMember'],
    ['wfs:FeatureCollection', 'wfs:member']
  ];

  getResponseData(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", url);
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

  public convertToJson(data) {
    data = data.toString().replace("\ufeff", "");
    data = data.toString('utf8');
    const parser = new xml2js.Parser();
    return new Promise((resolve, reject) => {
      p.parseString(data, {trim: true}, function (err, result) {
        resolve(result);
      });
    });
  }

  public getDataFromGeoJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[] {
    const dataCollection: object[] = [];
    let dataIndex = 0;
    for (let feature of wfsData["features"]) {
      let data = feature["properties"];
      if (!data.hasOwnProperty('id')) {
        data['id'] = dataIndex;
      }
      dataCollection.push(data);
      dataIndex++;
    }
    return dataCollection;
  }

  public getDataFromWFSJson(wfsData: object[], wfsTypename: string, properties: string[], prefix: string): object[] {
    let newWfs = this.getFeatureNode(wfsData);

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

  private getFeatureNode(wfsData: object[]): object[] {
    let newWfs = wfsData;
    for (const baseNode of this.baseNodes) {
      newWfs = wfsData
      for (let node of baseNode) {
        newWfs = newWfs[node];
      }
      if (newWfs && newWfs.hasOwnProperty("length")) {
        return newWfs
      }
    }
    return newWfs;
  }

}
