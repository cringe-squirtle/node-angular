import { HomeComponent } from './home/home.component'
import { MovieComponent } from './movie/movie.component'
import { TvComponent } from './tv/tv.component'
import { WatchlistComponent } from './watchlist/watchlist.component'
import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'watch/movie/:id', component: MovieComponent },
    { path: 'watch/tv/:id', component: TvComponent },
    { path: 'mylist', component: WatchlistComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule { }