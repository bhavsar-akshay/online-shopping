import { Component, ComponentFactoryResolver, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertBoxComponent } from '../shared/alert-box/alert-box.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';
import { UserService } from './user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {

  signInMode = true;
  showPassword = false;
  isLoading = false;
  error: string = null;
  private closeSub: Subscription;

  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  // tslint:disable-next-line: max-line-length
  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver, private userService: UserService) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.signInMode = !this.signInMode;
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  signInWithGoogle() {
    this.authService
      .signInWithGoogle()
      .then((res) => {
        console.log(res);
        // if (res.additionalUserInfo.isNewUser) {
        //   this.userService.createUser(res.additionalUserInfo.profile);
        // }
        //const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
        //location.reload();
        //this.authService.user.next('true');
        //this.authService.handleAuthenticate(res.user.email, res.user.uid, res.user.ma,);
        this.router.navigate(['/recipes']);
      })
      .catch((err) => {
        console.log(err);
        this.showErrorAlert(err);
      });
  }

  onSubmit(formRef: NgForm) {
    const email = formRef.value.email;
    const password = formRef.value.password;
    const userName = formRef.value.userName;
    const contact = formRef.value.contatNumber;
    const dateOfBirth: Date = formRef.value.dateOfBirth;
    this.isLoading = true;


    let authObj: Observable<AuthResponseData>;

    if (this.signInMode) {
      authObj = this.authService.signIn(email, password);
    } else {
      authObj = this.authService.signUp(email, password);
    }

    authObj.subscribe(
      ResponseData => {
        console.log(ResponseData)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        this.showPassword = false;
        this.showErrorAlert(errorMessage);
      });

    formRef.reset();
  }

  onAlertClose() {
    this.error = null;
  }

  showErrorAlert(message: string) {
    const alertCompResolver = this.componentFactoryResolver.resolveComponentFactory(AlertBoxComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCompResolver);

    componentRef.instance.errorMessage = message;

    this.closeSub = componentRef.instance.close.subscribe(
      () => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();

      });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
