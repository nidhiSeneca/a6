import { Component, OnInit } from '@angular/core';
import { AuthService }  from '../auth.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router"
import RegisterUser from '../RegisterUser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser : RegisterUser = {userName: "", password: "", password2: ""};
  warning: string = "";
  success: boolean= false;
  loading: boolean=false;

  private registerUserSub: Subscription | undefined;
  private routeSub: Subscription | undefined;


  constructor(private auth : AuthService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm): void {
    this.loading=true;
    if(this.registerUser.userName != null && 
       this.registerUser.password != null &&
       this.registerUser.password2 != null ){

          this.routeSub = this.route.params.subscribe(params => {
            this.registerUserSub = this.auth.register(this.registerUser).subscribe(data => {
              this.success = true;
              //this.warning = "";
              this.loading=false;
              this.router.navigate(['/new-releases']);
            },(err) => {
              this.warning = err.error.message;
            });
          });
       }
       else{
         this.success=false;
         this.warning="error";
         this.loading=false;

       }
    
    
  }
}
