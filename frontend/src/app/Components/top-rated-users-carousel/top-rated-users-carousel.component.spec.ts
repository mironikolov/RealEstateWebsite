import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopRatedUsersCarouselComponent } from './top-rated-users-carousel.component';

describe('TopRatedUsersCarouselComponent', () => {
  let component: TopRatedUsersCarouselComponent;
  let fixture: ComponentFixture<TopRatedUsersCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopRatedUsersCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopRatedUsersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
