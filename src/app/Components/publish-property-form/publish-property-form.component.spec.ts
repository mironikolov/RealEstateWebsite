import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishPropertyFormComponent } from './publish-property-form.component';

describe('PublishPropertyFormComponent', () => {
  let component: PublishPropertyFormComponent;
  let fixture: ComponentFixture<PublishPropertyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishPropertyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
