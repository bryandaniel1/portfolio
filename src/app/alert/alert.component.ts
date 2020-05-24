import { Component } from '@angular/core';
import { AlertService } from '../services/alert.service';

/**
 * Displays an alert message.
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  /**
   * Initializes the alert service.
   * 
   * @param service the alert service
   */
  constructor(public service: AlertService) { }
}