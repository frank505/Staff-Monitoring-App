import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {AuthenticationServiceService} from '../../services/authentication-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';
 
  pages = [
    {
      title: 'Home',
      url: '/admin/dashboard/home',
      icon:'home'
    },
    {
      title: 'admin info',
      url: '/admin/dashboard/profile',
      icon: 'people'
    },
    {
     title:'staffs',
     url:'/admin/dashboard/user-profile',
     icon:'contacts'
    },
    {
      title:'tasks',
      url:'/admin/dashboard/tasks',
      icon:'add-circle'
    },
    {
      title:'staffs login',
      url:'/admin/dashboard/staff-login-details',
      icon:'people'
    },
    {
      title:'Settings',
      url:'/admin/settings',
      icon:'cog'
    },
    {
      title:'About',
      url:'/admin/about',
      icon:'information-circle'
    }
  ];

  constructor(private router: Router,private alert:AlertService,private authService:AuthenticationServiceService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }
 
  ngOnInit() {
 
  }
 
  Logout()
  {
   this.authService.logout();
  }
}