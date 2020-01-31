import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;

  // tslint:disable-next-line: max-line-length
  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveData() {
    if (this.router.url === '/recipes') {
      this.dataStorageService.storeRecipes();
    }
    // else if (this.router.url === '/products') {
    //   this.dataStorageService.storeProducts();
    // }
  }

  onFetchData() {
    if (this.router.url === '/recipes') {
      this.dataStorageService.fetchRecipes().subscribe();
    } else if (this.router.url === '/products') {
      this.dataStorageService.fetchProducts().subscribe();
    }
  }

  onLogout() {
    this.isAuthenticated = false;
    this.authService.signout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
