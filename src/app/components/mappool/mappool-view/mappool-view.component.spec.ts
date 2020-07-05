import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappoolViewComponent } from './mappool-view.component';

describe('MappoolViewComponent', () => {
	let component: MappoolViewComponent;
	let fixture: ComponentFixture<MappoolViewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MappoolViewComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MappoolViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
