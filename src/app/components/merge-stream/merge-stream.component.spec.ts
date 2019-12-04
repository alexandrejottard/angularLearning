import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeStreamComponent } from './merge-stream.component';

describe('MergeStreamComponent', () => {
  let component: MergeStreamComponent;
  let fixture: ComponentFixture<MergeStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MergeStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
