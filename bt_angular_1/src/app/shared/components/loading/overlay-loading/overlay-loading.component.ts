import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-overlay-loading',
  templateUrl: './overlay-loading.component.html',
  styleUrls: ['./overlay-loading.component.scss']
})
export class OverlayLoadingComponent implements OnInit, OnChanges {
  @Input() loading: boolean | null = false;

  constructor(private cdr: ChangeDetectorRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.loading);
  }

  ngOnInit(): void {
  }

}
