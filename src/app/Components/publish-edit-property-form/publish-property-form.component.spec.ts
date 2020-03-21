import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishEditPropertyFormComponent } from './publish-property-form.component';

describe('PublishPropertyFormComponent', () => {
  let component: PublishEditPropertyFormComponent;
  let fixture: ComponentFixture<PublishEditPropertyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishEditPropertyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishEditPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
