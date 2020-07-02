import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSuggestedMapComponent } from './delete-suggested-map.component';

describe('DeleteSuggestedMapComponent', () => {
	let component: DeleteSuggestedMapComponent;
	let fixture: ComponentFixture<DeleteSuggestedMapComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [DeleteSuggestedMapComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeleteSuggestedMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
