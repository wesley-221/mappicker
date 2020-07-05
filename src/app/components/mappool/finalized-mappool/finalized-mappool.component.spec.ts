import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalizedMappoolComponent } from './finalized-mappool.component';

describe('FinalizedMappoolComponent', () => {
	let component: FinalizedMappoolComponent;
	let fixture: ComponentFixture<FinalizedMappoolComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FinalizedMappoolComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FinalizedMappoolComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
