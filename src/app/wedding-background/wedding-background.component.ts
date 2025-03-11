import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  type AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  type ElementRef,
  inject,
  type OnDestroy,
  type OnInit,
  signal,
  ViewChild,
} from '@angular/core';

interface Leaf {
  id: string;
  type: 'ivy' | 'eucalyptus';
  x: number;
  y: number;
  scale: number;
  rotation: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-wedding-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <div #container class="background-container">
      <!-- Background gradient -->
      <div class="background-gradient"></div>

      <!-- Image -->
      <div class="background-drawing"></div>

      <!-- Floating leaves -->
      <div class="leaves-container">
        <div
          *ngFor="let leaf of leaves()"
          class="leaf"
          [ngClass]="leaf.type"
          [style.left.%]="leaf.x"
          [style.transform]="'scale(' + leaf.scale + ')'"
          [style.animation-duration.ms]="leaf.duration"
          [style.animation-delay.ms]="leaf.delay"
        >
          <svg
            *ngIf="leaf.type === 'eucalyptus'"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 5C15 10 5 15 5 25C5 30 10 35 20 35C30 35 35 30 35 25C35 15 25 10 20 5Z"
              fill="currentColor"
              fill-opacity="0.6"
            />
            <path
              d="M20 5C18 12 15 20 20 30"
              stroke="#166534"
              stroke-width="1"
              stroke-linecap="round"
            />
          </svg>

          <svg
            *ngIf="leaf.type === 'ivy'"
            width="50"
            height="30"
            viewBox="0 0 50 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="25"
              cy="15"
              rx="20"
              ry="10"
              fill="#a7f3d0"
              fill-opacity="0.7"
            />
            <path
              d="M5 15C15 15 35 15 45 15"
              stroke="#047857"
              stroke-width="1"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="background-pattern"></div>
    </div>
  `,
  styleUrls: ['./wedding-background.component.scss'],
})
export class WeddingBackgroundComponent implements OnInit {
  Math = Math;

  leaves = signal<Leaf[]>([]);

  ngOnInit() {
    this.generateLeaves();
  }

  generateLeaves() {
    const ivyLeaves = this.generateLeafSet(17, 'ivy');
    const eucalyptusLeaves = this.generateLeafSet(14, 'eucalyptus');
    this.leaves.set([...ivyLeaves, ...eucalyptusLeaves]);
  }

  generateLeafSet(count: number, type: 'ivy' | 'eucalyptus'): Leaf[] {
    return Array.from({ length: count }).map((_, i) => ({
      id: `${type}-${i}`,
      type,
      x: Math.random() * 100 - 15,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.7,
      rotation: Math.random() * 360,
      delay: Math.random() * 10000,
      duration: 15000 + Math.random() * 20000,
    }));
  }
}
