export class DataLoaderService {

  /*
  *   Request data from
  */

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

    // return this._http.get(url)
    //   .toPromise()
    //   .then(data => {
    //     return data;
    //   });
  }
  //
  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }


  /*
  *   Testing*/

  // getPlain(JSONUrl: string) {
  //   return this._http.get(JSONUrl, {responseType: 'text'});
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('GET', JSONUrl);
  //   return xhr;
  // }
  //
  // getPlainRequestTest(JSONUrl: string) {
  //   let encodedUri = encodeURIComponent(JSONUrl);
  //   return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getPlainResponse' + `?jsonUrl=${encodedUri}`);
  // }
  //
  // getJsonTest(JSONUrl: string) {
  //   let encodedUri = encodeURIComponent(JSONUrl);
  //   return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + `?jsonUrl=${encodedUri}`);
  // }
  //
  // getTextTest(textUrl: string) {
  //   let encodedUri = encodeURIComponent(textUrl);
  //   return this._http.get(this.getContextUrl(window.location.href) + '/api/json/getGeoJSON' + `?jsonUrl=${encodedUri}`, {responseType: 'text'});
  // }
  //
  // getPlainHeroku(url: string) {
  //   return this._http.get('https://cors-anywhere.herokuapp.com/' + url, {responseType: 'text'});
  // }
  //
  // public getContextUrl(currentUrl) {
  //   return currentUrl.indexOf('localhost') > -1 ? 'http://localhost:8080' : 'https://hub-backend.herokuapp.com';
  //
  // }


  /*
  *   Downloading files
  */

  // getCSVData(csvUrl: string) {
  //   return this._http.get(csvUrl, {responseType: 'text'});
  // }


  /*
  *   WFS Requests
  */
  //
  // getNumberOfFeatures(wfsUrl: string) {
  //   return this.getPlainHeroku('https://geodienste.hamburg.de/HH_WFS_Beteiligungsverfahren?service=WFS&version=1.1.0&request=GetFeature&typename=beteiligungsverfahren'
  //     + '&resultType=hits');
  // }
}

