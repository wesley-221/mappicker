import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-breadcrumb-component',
	templateUrl: './breadcrumb-component.component.html',
	styleUrls: ['./breadcrumb-component.component.scss']
})
export class BreadcrumbComponentComponent implements OnInit {
	@Input() menu: [any];
	lastItem: any;

	constructor() { }

	ngOnInit() {
		this.lastItem = this.menu[Object.keys(this.menu).length - 1];
	}
}
