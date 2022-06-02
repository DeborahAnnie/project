import { Component, OnInit } from '@angular/core';
import { CouchServiceService } from '../couch-service.service';

@Component({
  selector: 'app-view-stock',
  templateUrl: './view-stock.component.html',
  styleUrls: ['./view-stock.component.css'],
})
export class ViewStockComponent implements OnInit {
  constructor(private svc: CouchServiceService) {}

  ngOnInit(): void {
    const selector = {
      type: 'addProd',
    };

    this.svc.prodDetails(selector, 'demo_database').subscribe((datas: any) => {
      console.log('stock', datas);
      this.getStock = datas.docs;
    });
  }

  getStock: any = [];
}
