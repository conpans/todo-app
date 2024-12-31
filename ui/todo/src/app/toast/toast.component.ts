import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  toasts: { id: number; message: string; type: string; fading: boolean }[] = [];
  private nextId = 0;

  showToast(message: string, type: string = 'success') {
    const toastId = this.nextId++;
    this.toasts.push({ id: toastId, message, type, fading: false });

    // Start fade-out process after 2.5 seconds
    setTimeout(() => {
      this.startFadeOut(toastId);
    }, 2500);

    // Remove the toast after 3.5 seconds
    setTimeout(() => {
      this.toasts = this.toasts.filter((toast) => toast.id !== toastId);
    }, 3500);
  }

  private startFadeOut(id: number) {
    const toast = this.toasts.find((t) => t.id === id);
    if (toast) {
      toast.fading = true; // Trigger fade-out effect
    }
  }
}
