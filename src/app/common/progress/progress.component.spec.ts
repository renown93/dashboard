import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default color', () => {
    expect(component.color).toBe('#FA4616');
    const progressElement = fixture.nativeElement.querySelector('.progress');
    expect(progressElement.style.background).toContain(hexToRgb('#FA4616'));
  });

  it('should update the color based on input', () => {
    const testColor = '#FF0000';
    component.color = testColor;
    fixture.detectChanges();
    const progressElement = fixture.nativeElement.querySelector('.progress');
    expect(progressElement.style.background).toContain(hexToRgb(testColor));
  });

  it('should update the radius based on input', () => {
    const testRadius = 100;
    component.radius = testRadius;
    fixture.detectChanges();

    const progressElement = fixture.nativeElement.querySelector('.progress');
    expect(progressElement.style.width).toBe(`${testRadius}px`);
    expect(progressElement.style.height).toBe(`${testRadius}px`);
  });

  it('should fire complete event when the loop finishes', async () => {
    spyOn(component.complete, 'emit');
    component.progress = 100;
    await sleep(100);
    fixture.detectChanges();

    expect(component.complete.emit).toHaveBeenCalled();
  });
});

/**
 * Utility function to pause the tests for desired ms.
 * should be use with async/await
 */
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, ms);
  });
}

/**
 * When we use hex color code in style tag for conix-gradient, it's directly translated to RGB
 * which limits us to test it. This utility function translate hex to rgb so we can test if it's in the style.
 */
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
