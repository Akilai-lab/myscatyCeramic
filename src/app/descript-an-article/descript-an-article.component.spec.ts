import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptAnArticleComponent } from './descript-an-article.component';

describe('DescriptAnArticleComponent', () => {
  let component: DescriptAnArticleComponent;
  let fixture: ComponentFixture<DescriptAnArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptAnArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptAnArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
