import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get currentUser(): User {
    return this.userService.getCurrentUser();
  }

  set currentUser(aUser: User) {
    this.userService.updateCurrentUser(aUser);
  }

  getUsers(): void {
    this.userService.getUsers()
          .subscribe(users => this.users = users);
  }

  compareUsers(v1: User, v2: User): boolean {
    return v1 && v2 ? v1.id === v2.id : v1 === v2;
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.userService.addUser({ name } as User)
      .subscribe(aUser => {
        this.users.push(aUser);
      //  const url = `./${aUser.id}`;
      //  this.log(`Navigating to ${url}`);
      //  this.router.navigate([url], { relativeTo: this.route });
      });
  }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * logging (TBD)
   */
  private log(message: string) {
    // TODO: implement logging for users
     console.log(message);
  }

}
