import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  username = '';

  private usersService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // username = computed(() => this.usersService.users.find(u => u.id === this.userId())?.name)

  ngOnInit(): void {
    console.log(this.activateRoute);
    const subscription = this.activateRoute.paramMap.subscribe({
      next: paramMap => 
        this.username = this.usersService.users.find(
          u => u.id === paramMap.get('userId')
        )?.name || ''
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
