import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/authentication/user';
import { UserService } from '../../../services/user.service';

@Component({
	selector: 'app-user-picker',
	templateUrl: './user-picker.component.html',
	styleUrls: ['./user-picker.component.scss']
})
export class UserPickerComponent implements OnInit {
	searchValue: string;
	allUsers: User[] = [];

	@Input() selectedUsers: User[] = [];

	constructor(private userService: UserService) {
		userService.getUserList().subscribe(response => {
			response.forEach(userIteration => {
				const user = User.serializeJson(userIteration);
				let foundUser = false;

				this.selectedUsers.forEach(selectedUser => {
					if (user.id == selectedUser.id) {
						foundUser = true;
					}
				});

				if (foundUser == false)
					this.allUsers.push(user);
			});
		});
	}

	ngOnInit(): void { }

	addNewMappicker(user: User): void {
		this.allUsers.splice(this.allUsers.indexOf(user), 1);
		this.selectedUsers.push(user);
	}

	removeMappicker(user: User): void {
		this.allUsers.push(user);
		this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
	}
}
