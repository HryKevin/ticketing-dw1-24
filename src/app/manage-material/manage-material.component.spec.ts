import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMaterialComponent } from './manage-material.component';

describe('ManageMaterialComponent', () => {
  let component: ManageMaterialComponent;
  let fixture: ComponentFixture<ManageMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageMaterialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
