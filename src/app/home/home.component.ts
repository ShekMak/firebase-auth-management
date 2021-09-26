import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  subscription = new Subscription();

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getCurrentUser().subscribe(
        userConnected => {
          // In the connected user, you will find the metadata that
          // will allow you to compare the creation date and the last connection date
          console.log(userConnected)
        }
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  signOut(): void {
    this.authService.signOut().then(
      () => {
        this.subscription.unsubscribe();
        this.router.navigate(['login']);
      }
    ).catch(error => {
      alert('Logout problem');
    });
  }

}
