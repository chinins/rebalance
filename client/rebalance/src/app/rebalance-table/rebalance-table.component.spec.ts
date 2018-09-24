import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebalanceTableComponent } from './rebalance-table.component';

describe('RebalanceTableComponent', () => {
  let component: RebalanceTableComponent;
  let fixture: ComponentFixture<RebalanceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebalanceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebalanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
