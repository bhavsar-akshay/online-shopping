import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent implements OnInit {
  @Input() errorMessage: string;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onClose(){
    this.close.emit();
  }
}
