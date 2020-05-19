import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  selector: 'app-attendant-layout',
  templateUrl: './attendant-layout.component.html',
  styleUrls: ['./attendant-layout.component.scss']
})
export class AttendantLayoutComponent implements OnInit {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    constructor(public location: Location, private router: Router) {
        setTimeout(() => {
            const node = document.createElement('script');
            node.src = '../../assets/js/scripts.bundle.js';
            node.type = 'text/javascript';
            node.async = false;
            document.getElementsByTagName('head')[0].appendChild(node);
        }, 200)
    }

    ngOnInit() {

    }

}
