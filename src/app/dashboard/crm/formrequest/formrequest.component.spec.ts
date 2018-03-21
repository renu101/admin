import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormrequestComponent } from './formrequest.component';

describe('FormrequestComponent', () => {
  let component: FormrequestComponent;
  let fixture: ComponentFixture<FormrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
