
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-modal-alert',
  templateUrl: './customer-modal-alert.component.html',
  styleUrls: ['./customer-modal-alert.component.css'],
 
})
export class CustomerModalAlertComponent {

  @Input() title! :string;
  @Input() action! :string;
  @Input() message! :string;
  constructor(public activeModal : NgbActiveModal) {
  }
}
