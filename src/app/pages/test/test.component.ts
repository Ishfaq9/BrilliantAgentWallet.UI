import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  unreadCount: number = 5; // Example count, you can update this dynamically

  // Optional: Clear count when the bell is clicked
  clearNotifications() {
    this.unreadCount = 0;
  }
}
