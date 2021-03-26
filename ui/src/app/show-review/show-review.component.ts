import { Component, OnInit, Input } from '@angular/core';
import dateFormat from 'dateformat'

@Component({
    selector: 'app-show-review',
    templateUrl: './show-review.component.html',
    styleUrls: ['./show-review.component.css']
})
export class ShowReviewComponent implements OnInit {

    @Input() param: any;

    author: string;
    image: string;
    content: string;
    date: string;
    rate: number;
    url: string;

    constructor() { }

    ngOnInit(): void {
        const review = this.param.review;
        this.author = review.author;
        this.image = review.avatar_path;
        this.content = review.content;
        this.rate = review.rating || 0;
        this.url = review.url;
        this.date = dateFormat(new Date(review.created_at), 'mmmm d, dddd, yyyy, h:MM:ss TT')

    }

}
