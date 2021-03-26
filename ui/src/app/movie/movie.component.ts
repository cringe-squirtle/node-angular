import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import urls from '../../config'
import { ShowDetailComponent } from '../show-detail/show-detail.component'


@Component({
    selector: 'app-movie',
    templateUrl: './movie.component.html',
    styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

    id: string;

    constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    }


    show = true

    ngOnInit(): void {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {

            this.id = this.activatedRoute.params['_value'].id
            this.addWatchList(this.id)
            this.show = false
            setTimeout(() => {
                this.show = true
            }, 100);
        })
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
            this.http.get<any>(urls.movie_details(id)).subscribe(data => {
                const item = {
                    id: data.id,
                    title: data.title,
                    image: data.poster,
                    type: 'movie'
                }
                watchlist.unshift(item)
                localStorage.setItem('continuelist', JSON.stringify(watchlist));
            })
        }
    }

}
