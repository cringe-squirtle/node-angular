import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularResizedEventModule } from 'angular-resize-event';

import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { TvComponent } from './tv/tv.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { CurrentPlayingMovieComponent } from './current-playing-movie/current-playing-movie.component';
import { CastModalComponent } from './cast-modal/cast-modal.component';
import { LineListShowsComponent } from './line-list-shows/line-list-shows.component'
import { ShowDetailComponent } from './show-detail/show-detail.component'
import { CastCardComponent } from './cast-card/cast-card.component';
import { ShowReviewComponent } from './show-review/show-review.component';
import { SearchComponent } from './search/search.component'


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MovieComponent,
        TvComponent,
        WatchlistComponent,
        CurrentPlayingMovieComponent,
        CastModalComponent,
        LineListShowsComponent,
        ShowDetailComponent,
        CastCardComponent,
        ShowReviewComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        AngularResizedEventModule,
        YouTubePlayerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
