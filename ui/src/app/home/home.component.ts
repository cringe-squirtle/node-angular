import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../config'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    sections = {
        '1': { url: config.popular_movie, title: 'Popular Movies', items: [], type: 'movie' },
        '2': { url: config.top_movie, title: 'Top Rated Movies', items: [], type: 'movie' },
        '3': { url: config.trending_movie, title: 'Trending Movies', items: [], type: 'movie' },
        '4': { url: config.popular_tv, title: 'Popular TV Shows', items: [], type: 'tv' },
        '5': { url: config.top_tv, title: 'Top Rated TV Shows', items: [], type: 'tv' },
        '6': { url: config.trending_tv, title: 'Trending TV Shows', items: [], type: 'tv' }
    }

    constructor(private http: HttpClient) {

    }

    ngOnInit(): void {
        const watchlist = JSON.parse(localStorage.getItem('continuelist'));
        this.sections['0'] = { title: 'Continue Watching', items: watchlist, type: 'multi' }

        for (let i in this.sections) {
            if (i !== '0')
                this.http.get<any>(this.sections[i].url).subscribe(data => {
                    this.sections[i].items = data
                })
        }
    }

}
