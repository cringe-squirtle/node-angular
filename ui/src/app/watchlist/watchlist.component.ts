import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

    screen_big = false;
    watchlist = [];
    cardWidth = '100%'
    cardHeight = 0
    line_nm = 1
    hovers = []


    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
        this.hovers = this.watchlist.map(e => this.screen_big)
    }

    sectionOnResize = e => {
        const sectionWidth = e.newWidth
        this.line_nm = 1
        if (sectionWidth > 900) {
            this.line_nm = 6
        } else if (sectionWidth > 800 && sectionWidth <= 900) {
            this.line_nm = 5
        } else if (sectionWidth > 700 && sectionWidth <= 800) {
            this.line_nm = 4
        } else if (sectionWidth > 600 && sectionWidth <= 700) {
            this.line_nm = 3
        } else if (sectionWidth > 500 && sectionWidth <= 600) {
            this.line_nm = 2
        } else if (sectionWidth < 400) {
            this.line_nm = 1
        }
        if (this.line_nm === 1) {
            this.screen_big = false
            this.setAllHover()
        } else {
            this.screen_big = true
            this.clearAllHover()
        }
        const card_width = 0.9 / this.line_nm;
        this.cardWidth = card_width * 100 + '%'
        this.cardHeight = sectionWidth * card_width * 750 / 500
    }

    setHover = i => this.hovers[i] = true
    clearHover = i => this.hovers[i] = false
    setAllHover = () => this.hovers = this.hovers.map(e => true)
    clearAllHover = () => this.hovers = this.hovers.map(e => false)

}
