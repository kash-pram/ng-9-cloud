import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgWordCloudComponent } from './ng-word-cloud.component';

describe('NgWordCloudComponent', () => {
  let component: NgWordCloudComponent;
  let fixture: ComponentFixture<NgWordCloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgWordCloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgWordCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
