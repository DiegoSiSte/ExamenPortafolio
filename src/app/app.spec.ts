import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the portfolio hero', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gastón Diego Mancilla');
    expect(compiled.textContent).toContain('Desarrollador frontend');
    expect(compiled.querySelector('#proyectos')).toBeTruthy();
    expect(compiled.querySelector('#redes')).toBeTruthy();
    expect(compiled.querySelector<HTMLAnchorElement>('#redes a[href="https://github.com/DiegoSiSte"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLAnchorElement>('#redes a[href="https://www.instagram.com/diego_magz/"]')).toBeTruthy();
    expect(compiled.querySelector<HTMLImageElement>('#sobre-mi img')?.getAttribute('src')).toBe(
      '/images/profile/portrait.jpeg',
    );
  });
});
