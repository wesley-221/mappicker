import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user';
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
			for(let item in response) {
				const user = User.serializeJson(response[item]);
				let foundUser = false;

				for(let mappicker in this.selectedUsers) {
					if(user.id == this.selectedUsers[mappicker].id) {
						foundUser = true;
					}
				}

				if(foundUser == false)
					this.allUsers.push(user);
			}
		});
	}

	ngOnInit(): void { }

	addNewMappicker(user: User) {
		this.allUsers.splice(this.allUsers.indexOf(user), 1);
		this.selectedUsers.push(user);
	}

	removeMappicker(user: User) {
		this.allUsers.push(user);
		this.selectedUsers.splice(this.selectedUsers.indexOf(user), 1);
	}
}
