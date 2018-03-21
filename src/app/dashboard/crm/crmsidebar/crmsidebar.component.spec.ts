import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmsidebarComponent } from './crmsidebar.component';

describe('CrmsidebarComponent', () => {
  let component: CrmsidebarComponent;
  let fixture: ComponentFixture<CrmsidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmsidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
