import { Component, OnInit, ViewChild } from '@angular/core';
import urls from '../../config'
import { HttpClient } from '@angular/common/http';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
    selector: 'app-current-playing-movie',
    templateUrl: './current-playing-movie.component.html',
    styleUrls: ['./current-playing-movie.component.css']
})
export class CurrentPlayingMovieComponent implements OnInit {

    @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

    current_playing_movies: any;
    paused = false;
    unpauseOnArrow = false;
    pauseOnIndicator = false;
    pauseOnHover = true;
    pauseOnFocus = true;
    hoverOff = window.innerWidth < 400;
    movieHover = []



    constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) {

    }

    ngOnInit(): void {
        this.http.get<any>(urls.current_playing_movie).subscribe(data => {
            this.current_playing_movies = []
            for (let i = 0; i < data.length; i++) {
                const img = new Image();
                img.onload = () => {
                    this.current_playing_movies.push({
                        id: data[i].id,
                        width: img.width,
                        height: img.height,
                        link: `url(${data[i].image})`,
                        image: data[i].image,
                        title: data[i].title,
                        type: 'movie'
                    })
                    this.movieHover.push(this.hoverOff)
                }
                img.src = data[i].image;
            }
        })



        this.breakpointObserver.observe([
            '(max-width: 400px)',

        ]).subscribe((state: BreakpointState) => {
            if (state.breakpoints['(max-width: 400px)']) {
                this.hoverOff = true
                this.setAllHover()
                const ols = document.getElementsByClassName('carousel-indicators')
                for (let i = 0; i < ols.length; i++) {
                    ols[i].classList.add('invisible')
                }
            }
            else {
                this.hoverOff = false
                this.clearAllHover()
                const ols = document.getElementsByClassName('carousel-indicators')
                for (let i = 0; i < ols.length; i++) {
                    ols[i].classList.remove('invisible')
                }
            }
        });

    }

    setHover = id => this.movieHover[id] = true
    clearHover = id => this.movieHover[id] = this.hoverOff === true ? true : false
    setAllHover = () => this.movieHover = this.movieHover.map(e => true)
    clearAllHover = () => this.movieHover = this.movieHover.map(e => false)

    togglePaused() {
        if (this.paused) {
            this.carousel.cycle();
        } else {
            this.carousel.pause();
        }
        this.paused = !this.paused;
    }

    onSlide(slideEvent: NgbSlideEvent) {
        if (this.unpauseOnArrow && slideEvent.paused &&
            (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
            this.togglePaused();
        }
        if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
            this.togglePaused();
        }
    }

}

