import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import PerfectScrollbar from 'perfect-scrollbar';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { NotificationService } from '@services/notification.service';
import { TokenService } from '@services/token.service';
import { UserService } from '@services/user.service';
import { CommonService } from '@services/common.service';

@Component({
  selector: 'app-attendant-layout',
  templateUrl: './attendant-layout.component.html',
  styleUrls: ['./attendant-layout.component.scss']
})
export class AttendantLayoutComponent implements OnInit,OnDestroy {
    private _router: Subscription;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    addPushSubscriberSub;
    readonly VAPID_PUBLIC_KEY = 'BE-J8ek0Xl6Mpgw5R6-B5M5BYISYVkQi6XVGmt8qymgz-u66hyrkEFcgZKJECL8bLHbPyPiVwgTaoH9EpP6VNlc';
    image;
    name;
    arr: any = [];

    constructor(
        public location: Location,
        private router: Router,
        private swUpdate: SwUpdate,
        private swPush: SwPush,
        private notificationService: NotificationService,
        private userService: UserService,
        private token: TokenService,
        private service: CommonService
    ) {
        this.name = token.getFirstName() + ' ' + token.getLastName();
        this.image = token.getImg();
        this.getNotification();
        this.subscribeToNotifications()
        setTimeout(() => {
            const node = document.createElement('script');
            node.src = '../../assets/js/scripts.bundle.js';
            node.type = 'text/javascript';
            node.async = false;
            document.getElementsByTagName('head')[0].appendChild(node);
        }, 200)
    }

    ngOnInit() {
        if (this.image)
            this.service.data$.subscribe(res => { this.image = res['image'], this.name = res['name'] })
    }
    logout() {
        this.userService.loguot();
    }

    subscribeToNotifications() {

        this.swPush.requestSubscription({
            serverPublicKey: this.VAPID_PUBLIC_KEY
        })
            .then(sub1 => {
                const data = {
                    sub: sub1,
                    role: 'attendant'
                };
                this.addPushSubscriberSub = this.notificationService.addPushSubscriber(data).subscribe((data1) => { });
            })
            .catch(err => console.log('Could not subscribe to notifications', err));
    }

    ngOnDestroy() {

        if (this.addPushSubscriberSub !== undefined) {
            this.addPushSubscriberSub.unsubscribe();
        }
    }

    getNotification() {
        this.notificationService.getAllNotification().subscribe(
            data => {
                data['data'].forEach(e => {
                    if ((e.role === 'all' || e.role === 'attendant') && e.notificationStatus !== '2' && this.calculateDiff(e.validDate) >= 0) {
                        this.arr.push(e);
                    }
                })
                console.log(this.arr);
            }
        )
    }

    calculateDiff(date) {
        let validDate = new Date(date);
        let currentDate = new Date();

        return Math.floor((Date.UTC(validDate.getFullYear(), validDate.getMonth(), validDate.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())) / (1000 * 60 * 60 * 24));
    }

}
