import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import urls from '../../config'
import { Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router'


@Injectable()
export class FetchService {
    constructor(private http: HttpClient) { }

    search(query: string) {
        if (query === '') {
            return of([]);
        }

        return this.http
            .get<any>(urls.search_multi(query)).pipe();
    }
}



@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    providers: [FetchService],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

    public model: string;
    searchResult: {}


    m

    constructor(private _service: FetchService, private router: Router) { }

    ngOnInit(): void {
    }




    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(term =>
                this._service.search(term).pipe()
            )
        )


    formatter = (x: { title: string }) => '';

    selectedItem(item) {
        this.router.navigateByUrl(`/watch/${item.item.type}/${item.item.id}`);
    }

}


