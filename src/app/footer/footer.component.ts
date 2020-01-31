import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  isLargeScreen = true;

  @HostListener('window:resize', ['$event'])

  onResize(event) {
      if(window.innerWidth < 950){
        this.isLargeScreen = false;
      } else {
        this.isLargeScreen = true;
      }
  }

  constructor() { }

  ngOnInit() {
    if(window.innerWidth < 950){
      this.isLargeScreen = false;
    } else {
      this.isLargeScreen = true;
    }
  }

}
