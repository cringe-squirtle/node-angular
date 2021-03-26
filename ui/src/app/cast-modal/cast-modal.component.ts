import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import urls from '../../config'
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';



@Component({
    selector: 'app-cast-modal',
    templateUrl: './cast-modal.component.html',
    styleUrls: ['./cast-modal.component.css']
})
export class CastModalComponent implements OnInit {

    @Input() param;

    birthday: string;
    gender: string;
    title: string;
    homepage: string;
    aka: string;
    kfd: string;
    bio: string;
    birthplace: string;
    screen_big = false;
    external_imdb = { display: false, link: id => `https://www.imdb.com/name/${id}/`, url: '' }
    external_fb = { display: false, link: id => `https://www.facebook.com/${id}/`, url: '' }
    external_ins = { display: false, link: id => `https://www.instagram.com/${id}/`, url: '' }
    external_twt = { display: false, link: id => `https://twitter.com/${id}`, url: '' }

    constructor(public activeModal: NgbActiveModal, private http: HttpClient, private breakpointObserver: BreakpointObserver) { }

    ngOnInit(): void {
        this.http.get<any>(urls.cast_detail(this.param.id)).subscribe(data => {
            this.birthday = data.birthday
            this.gender = data.gender === 1 ? 'Male' : 'Femal'
            this.title = data.title;
            this.homepage = data.homepage
            this.aka = data.also_known_as.join(',')
            this.kfd = data.known_for_department
            this.bio = data.biography
            this.birthplace = data.place_of_birth
        })

        this.http.get<any>(urls.cast_external_ids(this.param.id)).subscribe(data => {
            this.external_imdb.display = data.imdb_id ? true : false
            this.external_imdb.url = data.imdb_id ? this.external_imdb.link(data.imdb_id) : ''

            this.external_fb.display = data.facebook_id ? true : false
            this.external_fb.url = data.facebook_id ? this.external_fb.link(data.facebook_id) : ''

            this.external_ins.display = data.instagram_id ? true : false
            this.external_ins.url = data.instagram_id ? this.external_ins.link(data.instagram_id) : ''

            this.external_twt.display = data.twitter_id ? true : false
            this.external_twt.url = data.twitter_id ? this.external_fb.link(data.twitter_id) : ''

        })

        this.breakpointObserver.observe([
            '(max-width: 500px)',

        ]).subscribe((state: BreakpointState) => {
            if (state.breakpoints['(max-width: 500px)']) {
                this.screen_big = false
                console.log('enter')
            }
            else {
                this.screen_big = true;

            }
        })
    }
}
