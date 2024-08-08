import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn',
  templateUrl: './btn.component.html',
  styleUrls: ['./btn.component.scss'],
})
export class BtnComponent {
  @Input() color: string = ''; // Default color
  @Input() title: string = 'Submit'; // Button title
  @Input() disabled: boolean = false; // Disabled state
}
