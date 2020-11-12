import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoleggioUtenteComponent } from './noleggio-utente.component';

describe('NoleggioUtenteComponent', () => {
  let component: NoleggioUtenteComponent;
  let fixture: ComponentFixture<NoleggioUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoleggioUtenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoleggioUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
