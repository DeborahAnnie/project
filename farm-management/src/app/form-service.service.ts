import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  public endpt =
    'https://5804af1c-53d6-4cc1-b0eb-5219a1cc5775-bluemix.cloudant.com/';
  public password = 'ee0e39016c30dc0fc4fd04d12a420174';
  public username = 'apikey-v2-380rhhqzbqk6eifbn30gvuevzk9903pdrrsd7f8ipknj';
  basicAuth = 'Basic ' + btoa(this.username + ':' + this.password);
  url!: string;

  constructor(public http: HttpClient) {
    console.log('Node Working');
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.basicAuth,
    }),
  };

  storedata(Formvalue: any) {
    console.log(Formvalue);
    return this.http.post<any>('http://localhost:8000/postdata/', Formvalue);
  }
  storeData(formData: any) {
    console.log('From api', formData);
    return this.http.post<any>('http://localhost:8000/postdata1/', formData);
  }

  test_get(id: any) {
    console.log('call', id);
    return this.http.get<any>('http://localhost:8000/getdata/' + id);
  }

  db = 'demo_database';
  Validation(query: any) {
    const url = `${this.endpt + this.db}/_find`;
    const selectorData = {
      selector: query,
    };
    return this.http.post(url, selectorData, this.httpOptions);
  }

  uname(nameobject: any) {
    return this.http.get<any>('http://localhost:8000/uname/' + nameobject);
  }
}
