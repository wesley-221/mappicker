import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedMapsListComponent } from './suggested-maps-list.component';

describe('SuggestedMapsListComponent', () => {
	let component: SuggestedMapsListComponent;
	let fixture: ComponentFixture<SuggestedMapsListComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SuggestedMapsListComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuggestedMapsListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
