/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Nidhi Patel Student ID: 117209205 Date: 10-4-2022
*
*  Angular App (Deployed) Link: _____________________________________________________
*
*  User API (Heroku) Link:  
*
********************************************************************************/ 



import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import {AuthService} from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'web422-a6';
  searchString: string = "";
  public token: any;


  constructor(private router: Router,private auth: AuthService){}
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
    
  }

  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }
  logout() {
    console.log("logout");
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
