import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappoolCreationTemplateComponent } from './mappool-creation-template.component';

describe('MappoolCreationTemplateComponent', () => {
	let component: MappoolCreationTemplateComponent;
	let fixture: ComponentFixture<MappoolCreationTemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [MappoolCreationTemplateComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MappoolCreationTemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
