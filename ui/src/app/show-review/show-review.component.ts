import { Component, OnInit, Input } from '@angular/core';

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

        const months = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const date = new Date(review.created_at)
        const hour = date.getHours() % 12
        this.date = `${months[date.getMonth()]} ${date.getDate()}, ${days[date.getDay()]}, ${date.getFullYear()}, ${hour ? hour : 12}:${date.getMinutes()}:${date.getSeconds()} ${date.getHours() >= 12 ? 'PM' : 'AM'}`
    }

}
