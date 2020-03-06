import { Component, AfterViewInit, DoCheck, Input, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from "@angular/core";
import { v4 as uuid } from 'uuid';
import { Tag } from "./tag";

@Component({
  selector: 'ng-word-cloud',
  templateUrl: './ng-word-cloud.component.html',
  styleUrls: ['./ng-word-cloud.component.css']
})
export class NgWordCloudComponent implements AfterViewInit, DoCheck, OnDestroy {
  private readonly _instanceId = uuid();
  private _options: TagCanvasOptions;
  private _previousTagListState: string;

  readonly canvasId = `canvas-${this._instanceId}`;
  readonly tagListId = `tags-${this._instanceId}`;

  readonly defaultOptions: TagCanvasOptions = {
    textFont: null,
    textColour: null,
    weightFrom: 'data-weight' // TODO: Hide this field from external modules
  };

  canvasWidth: number;
  canvasHeight: number;

  @Input()
  tags: Tag[];

  // TODO: Add stretch (boolean) input

  @Input()
  set options(value: TagCanvasOptions) {
    this._options = value;
    this.start();
  }
  get options() {
    return this._options;
  }

  @Output()
  tagClick: EventEmitter<Tag> = new EventEmitter();

  @ViewChild('canvas')
  canvas: ElementRef;

  constructor(private elementRef: ElementRef) {  }

  async start() {
      let mergedOptions = Object.assign({}, this.defaultOptions, this._options);
      await blinkEyes();
      TagCanvas.Start(this.canvasId, this.tagListId, mergedOptions);
  }

  async update() {
      await blinkEyes();
      TagCanvas.Update(this.canvasId);
  }

  ngAfterViewInit(): void {
    let canvasElement = this.canvas.nativeElement as HTMLCanvasElement;
    canvasElement.width = Math.round(canvasElement.clientWidth);
    canvasElement.height = Math.round(canvasElement.clientHeight);

    let style = window.getComputedStyle(this.elementRef.nativeElement);
    this.defaultOptions.textHeight = parseFloat(style['font-size']);

    this.start();
  }

  ngDoCheck(): void {
    //TODO add image
      let tagListState = JSON.stringify(this.tags.map(({ text: text, weight: weight }) => [ text, weight  ]));
      // TODO: Improve performance, use KeyValueDiffer/IterableDiffer
      if (this._previousTagListState !== tagListState) {
          this._previousTagListState = tagListState;
          this.update();
      }
  }

  ngOnDestroy(): void {
      TagCanvas.Delete(this.canvasId);
  }

} // EXPORT


/**
    @description Waits for change detection cycle
    @returns Promise<void>
*/
async function blinkEyes(): Promise<void> {
  await new Promise(resolve => setTimeout(() => resolve()));
}
