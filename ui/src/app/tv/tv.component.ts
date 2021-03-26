import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import urls from '../../config'
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
    selector: 'app-tv',
    templateUrl: './tv.component.html',
    styleUrls: ['./tv.component.css']
})
export class TvComponent implements OnInit {


    id: string;

    show = true

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

            this.id = this.activatedRoute.params['_value'].id
            this.addWatchList(this.id)
            this.show = false
            setTimeout(() => {
                this.show = true
            }, 100);
        })
    }

    ngOnInit(): void {
        this.addWatchList(this.id)
    }

    addWatchList = id => {
        let watchlist = JSON.parse(localStorage.getItem('continuelist'));
        let inx = -1;
        for (let i = 0; i < watchlist.length; i++) {
            if (watchlist[i].id === parseInt(id)) {
                inx = i;
                break;
            }
        }
        if (inx !== -1) {
            const temp = watchlist[0]
            watchlist[0] = watchlist[inx]
            watchlist[inx] = temp
            localStorage.setItem('continuelist', JSON.stringify(watchlist));
        }
        else {
            this.http.get<any>(urls.tv_details(id)).subscribe(data => {
                const item = {
                    id: data.id,
                    title: data.title,
                    image: data.poster,
                    type: 'tv'
                }
                watchlist.unshift(item)
                localStorage.setItem('continuelist', JSON.stringify(watchlist));
            })
        }
    }

}
