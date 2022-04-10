import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {userName: "", password: "", _id: ""};
  warning:string = "";
  loading:boolean=false;

  private UserSub: Subscription | undefined;
  private routeSub: Subscription | undefined;

  constructor(private auth : AuthService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.loading=true;
    if(this.user.userName != null && 
       this.user.password != null){

          this.routeSub = this.route.params.subscribe(params => {
            this.UserSub = this.auth.login(this.user).subscribe(data => {             
              this.loading=false;
              this.auth.setToken(data.token);
              this.auth.isAuthenticated();
              this.router.navigate(['/new-releases']);
            });
          });
       }
       else{
        
         this.warning="error";
         this.loading=false;
       }
    
    
  }

}
