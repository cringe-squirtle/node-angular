import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-line-list-shows',
    templateUrl: './line-list-shows.component.html',
    styleUrls: ['./line-list-shows.component.css']
})
export class LineListShowsComponent implements OnInit {

    @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

    @Input() items = [];
    @Input() title: string;
    @Input() type: string;

    paused = true;
    unpauseOnArrow = false;
    pauseOnIndicator = false;
    pauseOnHover = true;
    pauseOnFocus = true;

    cardWidth = 0.15

    shows = [];
    hovers = [];
    hoverOff = true;

    constructor(private http: HttpClient, private breakpointObserver: BreakpointObserver) {


    }

    ngOnInit(): void {
        this.updateItems()
        this.breakpointObserver.observe([
            '(max-width: 500px)',

        ]).subscribe((state: BreakpointState) => {
            if (state.breakpoints['(max-width: 500px)']) {
                const ols = document.getElementsByClassName('carousel-indicators')
                for (let i = 0; i < ols.length; i++) {
                    ols[i].classList.add('invisible')
                }

                this.cardWidth = 0.7
                this.hoverOff = false
                this.shows = []
                this.hovers = []

                for (let i = 0; i < this.items.length; i++) {
                    this.shows.push([this.items[i]])
                    this.hovers.push([false])
                }

            }
            else {
                const ols = document.getElementsByClassName('carousel-indicators')
                for (let i = 0; i < ols.length; i++) {
                    ols[i].classList.remove('invisible')
                }

                this.cardWidth = 0.15
                this.hoverOff = true
                this.shows = []
                this.hovers = []

                for (let i = 0; i < this.items.length; i += 6) {
                    this.shows.push(this.items.slice(i, i + 6))
                    this.hovers.push([false, false, false, false, false, false])
                }
            }
        });
    }

    reset = () => {
        this.ngOnInit()
    }

    setHover = (i, j) => this.hovers[i][j] = true
    clearHover = (i, j) => this.hovers[i][j] = false

    updateItems = () => {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = {
                id: this.items[i].id,
                width: 500,
                height: 750,
                image: this.items[i].image,
                title: this.items[i].title,
                type: this.type === 'multi' ? this.items[i].type : this.type
            }
        }
    }

}
