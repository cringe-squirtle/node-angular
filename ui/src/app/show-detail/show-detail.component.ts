import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import urls from '../../config'

@Component({
    selector: 'app-show-detail',
    templateUrl: './show-detail.component.html',
    styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

    @Input() param: any;
    show_detail = {
        id: 0,
        title: '',
        overview: '',
        poster: '',
        release_date: '',
        runtime: '',
        genres: [],
        spoken_languages: [],
        vote_average: 0,
        tagline: ''
    };
    detail_prop = { left: '', right: '', genres: '', lan: '' }
    video_key = 'tzkWB85ULJY'
    video_width = 0;
    video_height = 0;
    detail_width = 0;
    screen_big = false;

    watchlist_btn_text = 'Add to Watchlist'
    watchlist_alert_show = false;
    watchlist_alert_text = 'Added to watchlist'
    alert_type = 'alert-success'
    watchlist = []

    process: any;

    cardWidth = 0
    cardHeight = 0

    line_nm = 1

    cast = []
    reviews = []


    recommend_title = ''
    recommend_items = []
    recommend_type = ''
    similar_title = ''
    similar_items = []
    similar_type = ''

    constructor(private http: HttpClient) { }

    ngOnInit(): void {



        const url_detail = this.param.type === 'movie' ? urls.movie_details(this.param.id) : urls.tv_details(this.param.id)
        const url_video = this.param.type === 'movie' ? urls.movie_video(this.param.id) : urls.tv_video(this.param.id)
        const url_cast = this.param.type === 'movie' ? urls.movie_cast(this.param.id) : urls.tv_cast(this.param.id)
        const url_review = this.param.type === 'movie' ? urls.movie_reviews(this.param.id) : urls.tv_reviews(this.param.id)
        const url_recommended = this.param.type === 'movie' ? urls.recommended_movie(this.param.id) : urls.recommended_tv(this.param.id)
        const url_similar = this.param.type === 'movie' ? urls.similar_movie(this.param.id) : urls.similar_tv(this.param.id)

        this.recommend_title = this.param.type === 'movie' ? 'Recommended Movies' : 'Recommended TV Shows'
        this.recommend_type = this.param.type
        this.similar_title = this.param.type === 'movie' ? 'Similar Movies' : 'Similar TV Shows'
        this.similar_type = this.param.type

        this.http.get<any>(url_detail).subscribe(data => {
            this.show_detail = data;
            this.detail_prop.left = data.release_date ? `${new Date(data.release_date).getFullYear()} | ` : 'unknown'
            const h = Math.floor((data.runtime || 0) / 60)
            const m = (data.runtime || 0) % 60
            this.detail_prop.right = `${data.vote_average}|${h}hrs ${m}mins`
            this.detail_prop.genres = data.genres ? data.genres.map(e => e.name).join(', ') : 'unknown'
            this.detail_prop.lan = data.spoken_languages ? data.spoken_languages.map(e => e.english_name).join(', ') : 'unknown'
        })
        this.http.get<any>(url_video).subscribe(data => {
            let found = false;
            for (let i = 0; i < data.length; i++) {
                if (data[i].type === 'Trailer' && data[i].site === 'YouTube') {
                    this.video_key = data[i].key
                    found = true
                    break;
                }
            }
            for (let i = 0; i < data.length && !found; i++) {
                if (data[i].type === 'Teaser' && data[i].site === 'YouTube') {
                    this.video_key = data[i].key
                    found = true
                    break;
                }
            }
        })
        this.http.get<any>(url_cast).subscribe(data => this.cast = data)
        this.http.get<any>(url_review).subscribe(data => this.reviews = data)

        this.http.get<any>(url_recommended).subscribe(data => this.recommend_items = data)
        this.http.get<any>(url_similar).subscribe(data => this.similar_items = data)

        this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
        for (let i = 0; i < this.watchlist.length; i++) {
            if (this.watchlist[i].id == this.param.id) {
                this.watchlist_btn_text = 'Remove from Watchlist'
                this.watchlist_alert_text = 'Added to watchlist'
                this.alert_type = 'alert-success'
                break;
            }
        }
    }


    videoSectionOnResize = e => {
        this.video_width = this.screen_big ? e.newWidth * 0.63 : e.newWidth
        this.video_height = 400 / 720 * this.video_width;
        this.detail_width = this.screen_big ? e.newWidth * 0.33 : e.newWidth

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
        } else {
            this.screen_big = true
        }
        const card_width = 0.9 / this.line_nm;
        this.cardWidth = card_width
        this.cardHeight = sectionWidth * card_width * 750 / 500

    }


    watchlist_btn_click = () => {
        if (this.process) {
            this.watchlist_alert_close()
        }

        if (this.watchlist_btn_text === 'Add to Watchlist') {
            let inx = -1
            for (let i = 0; i < this.watchlist.length; i++) {
                if (this.watchlist[i].id == this.show_detail.id) {
                    inx = i;
                    break
                }
            }
            if (inx !== -1) {
                let temp = this.watchlist[0]
                this.watchlist[0] = this.watchlist[inx]
                this.watchlist[inx] = temp
            } else {
                const url_detail = this.param.type === 'movie' ? urls.movie_details(this.param.id) : urls.tv_details(this.param.id)
                this.http.get<any>(url_detail).subscribe(data => {
                    const item = {
                        id: data.id,
                        title: data.title,
                        image: data.poster,
                        type: this.param.type
                    }
                    this.watchlist.unshift(item)
                    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
                })
            }

            this.watchlist_alert_show = true;
            this.watchlist_alert_text = 'Added to watchlist'
            this.alert_type = 'alert-success'
            this.watchlist_btn_text = 'Remove from Watchlist'
            this.process = setTimeout(() => {
                this.watchlist_alert_show = false;
                this.process = false
            }, 5000);
        } else {
            let inx = -1;
            for (let i = 0; i < this.watchlist.length; i++) {
                if (this.watchlist[i].id === this.show_detail.id) {
                    inx = i
                    break;
                }
            }
            if (inx !== -1) {
                this.watchlist.splice(inx, 1)
                this.watchlist_alert_show = true;
                this.watchlist_alert_text = 'Removed to watchlist'
                this.alert_type = 'alert-danger'
                this.watchlist_btn_text = 'Add to Watchlist'
                console.log(this.watchlist)
                localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
                this.process = setTimeout(() => {
                    this.watchlist_alert_show = false;
                    this.process = false
                }, 5000)
            }

        }

    }

    watchlist_alert_close = () => {
        clearTimeout(this.process)
        this.process = false
        this.watchlist_alert_show = false;
    }
}
