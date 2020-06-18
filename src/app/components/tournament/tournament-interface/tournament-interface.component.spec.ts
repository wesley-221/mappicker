import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentInterfaceComponent } from './tournament-interface.component';

describe('TournamentInterfaceComponent', () => {
  let component: TournamentInterfaceComponent;
  let fixture: ComponentFixture<TournamentInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
