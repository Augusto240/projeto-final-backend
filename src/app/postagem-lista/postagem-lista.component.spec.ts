import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemListaComponent } from './postagem-lista.component';

describe('PostagemListaComponent', () => {
  let component: PostagemListaComponent;
  let fixture: ComponentFixture<PostagemListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostagemListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostagemListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
