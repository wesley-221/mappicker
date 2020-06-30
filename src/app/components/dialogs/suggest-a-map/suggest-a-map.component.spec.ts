import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestAMapComponent } from './suggest-a-map.component';

describe('SuggestAMapComponent', () => {
	let component: SuggestAMapComponent;
	let fixture: ComponentFixture<SuggestAMapComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SuggestAMapComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SuggestAMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
