import { Component, OnInit, Input } from '@angular/core';

import { CastModalComponent } from '../cast-modal/cast-modal.component'


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-cast-card',
    templateUrl: './cast-card.component.html',
    styleUrls: ['./cast-card.component.css'],
})
export class CastCardComponent implements OnInit {

    @Input() param: any;

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    open() {
        const modalRef = this.modalService.open(CastModalComponent, { size: 'lg' });
        modalRef.componentInstance.param = { ...this.param.cast, ...this.param }
    }

}
