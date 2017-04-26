import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import 'rxjs/add/operator/toPromise';

import {IVirtualScrollOptions, ScrollObservableService} from 'od-virtualscroll';

import {RandomDataService} from './randomData/randomData.service';

@Component({
  selector: 'app-shell',
  styleUrls: ['src/app.component.css'],
  template: `
    <div class="container">
      <h1>od-virtualscroll</h1>
      <od-virtualscroll class="tiles-container" [vsData]="data$" [vsOptions]="options$">
        <ng-template let-item let-row="row">
          <div class="tile">
            <img class="contact-img" [src]="item.picture.thumbnail">
            <div class="contact">
              <div>Contact {{row+1}}: <strong>{{item.name.first}} {{item.name.last}}</strong></div>
              <div>{{item.email}}</div>
              <div>{{item.phone}}</div>
            </div>
          </div>
        </ng-template>
      </od-virtualscroll>
    <div>`
})
export class AppComponent {
  data$: Observable<any[]> = Observable.create((observer: Observer<any[]>) => {
    const fetchData = (results: number, page: number, seed='od-virtualscroll') => this._randomData.users(results, page, seed);

    let pagination: {results: number, page: number};
    const data: any = [];

    const emitNext = (_results: number, _page: number) => {
      // tslint:disable-next-line:no-console
      console.log(`FETCH: [${_page * _results}, ${_page * _results + _results}]`);
      fetchData(_results, _page).toPromise().then(res => {
        pagination = res.info;
        // Just mutate the data array for this demo
        res.results.forEach((d: any) => data.push(d));
        observer.next(data);
      }).catch(err => observer.error(err));
    };

    emitNext(50, 1); // Init

    this._scrollObs.scrollWin$.filter(([scrollWin]) => {
      // Detect scroll end
      return scrollWin.visibleEndRow !== -1 && scrollWin.visibleEndRow === scrollWin.numVirtualRows - 1;
    }).subscribe(([scrollWin]) => {
      // tslint:disable-next-line:no-console
      console.log(`---> OnScrollEnd: ${scrollWin.visibleEndRow}/${scrollWin.numVirtualRows - 1}`);
      if(pagination !== undefined) {
        emitNext(pagination.results, ++pagination.page);
      } else {
        observer.error('Duh..');
      }
    });
  });

  options$: Observable<IVirtualScrollOptions> = Observable.of({itemHeight: 100, numAdditionalRows: 1, numLimitColumns: 1});

  constructor(private _randomData: RandomDataService, private _scrollObs: ScrollObservableService) {}
}
