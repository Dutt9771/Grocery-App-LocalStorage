import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilenavComponent } from './profilenav.component';

describe('ProfilenavComponent', () => {
  let component: ProfilenavComponent;
  let fixture: ComponentFixture<ProfilenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
