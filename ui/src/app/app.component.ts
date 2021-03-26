import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})


export class AppComponent {
    title = 'USC Films';
    isCollapsed = true;
    navTabAt = { home: true, mylist: false }
    navHover = { home: false, mylist: false }




    constructor(private router: Router) {
        router.events.subscribe((url: any) => {
            if (url.url)
                this.navTabAt = url.url === '/' ? {
                    home: true, mylist: false
                } : url.url === '/mylist' ? {
                    home: false, mylist: true
                } : { home: false, mylist: false }
        })
        localStorage.setItem('continuelist', JSON.stringify([]));
        localStorage.setItem('watchlist', JSON.stringify([]));

    }

    setNavHover = type => this.navHover[type] = true;
    cancelNavHover = () => this.navHover = { home: false, mylist: false };



}
