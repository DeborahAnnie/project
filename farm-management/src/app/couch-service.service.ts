import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CouchServiceService {
  // public productList = new BehaviorSubject<any>([]);

  public endpoint =
    'https://5804af1c-53d6-4cc1-b0eb-5219a1cc5775-bluemix.cloudant.com/';
  public password = 'ee0e39016c30dc0fc4fd04d12a420174';
  public username = 'apikey-v2-380rhhqzbqk6eifbn30gvuevzk9903pdrrsd7f8ipknj';
  basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: this.basicAuth,
    }),
  };
  // search: any;

  constructor(private http: HttpClient) {
    console.log('working');
  }

  postDetails(formValues: any, db: any) {
    const url = this.endpoint + db;
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.post(url, formValues, {
      headers: { Authorization: basicAuth },
    });
  }

  getAll(db: any) {
    const url = this.endpoint + db + '/_all_docs?include_docs=true';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.get(url, { headers: { Authorization: basicAuth } });
  }
  getAllDocsByKeys(db: any, data: any) {
    const url = this.endpoint + db + '/_all_docs?include_docs=true';
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    return this.http.post(url, data, { headers: { Authorization: basicAuth } });
  }
  cartSubject = new Subject<any>();

  prodDetails(selectorObject: any, db: string) {
    const url = `${this.endpoint + db}/_find`;
    const basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
    const object = {
      selector: {
        type: selectorObject,
      },
    };
    return this.http.post(url, object, {
      headers: { Authorization: basicAuth },
    });
  }

  add(db: any, doc: object): Observable<{}> {
    console.log(doc);
    const url = this.endpoint + db;
    return this.http.post(url, doc, this.httpOptions);
  }

  fetchDataUsingFind(db: string, querObj: any) {
    const geturl = this.endpoint + db + '/_find';
    let dataObject = {
      selector: querObj,
    };
    return this.http.post(geturl, dataObject, this.httpOptions);
  }

  // getProducts() {
  //   return this.productList.asObservable();
  // }
}
