import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemCriarComponent } from './postagem-criar.component';

describe('PostagemCriarComponent', () => {
  let component: PostagemCriarComponent;
  let fixture: ComponentFixture<PostagemCriarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostagemCriarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostagemCriarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
