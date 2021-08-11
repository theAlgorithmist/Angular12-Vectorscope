/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Angular Dev Toolkit. Directive to select a Canvas element and create an EaselJS stage is from that reference.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 *
 */

import {
  OnInit
} from "@angular/core";

// platform imports
import {
  Directive,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

import { RGB } from "../color-types";

@Directive({
  selector: '[img-preview]'
})

export class ImgPreviewDirective implements OnInit
{
  protected _container: HTMLDivElement;

  protected _canvas!: HTMLCanvasElement;

  protected _rgbArr: Array<RGB>;

  protected _url: string;

  @Output('imgError')
  protected _onImgError: EventEmitter<string>;

  @Output('imgLoaded')
  protected _onLoaded: EventEmitter<string>;

  constructor(protected _elRef: ElementRef)
  {
    this._rgbArr = new Array<RGB>();
    this._url    = '';

    this._onImgError = new EventEmitter<string>();
    this._onLoaded   = new EventEmitter<string>();

    this._container = <HTMLDivElement> this._elRef.nativeElement;
    this._canvas    = document.createElement("CANVAS") as HTMLCanvasElement;

    this._canvas.width  = this._container.clientWidth;
    this._canvas.height = this._container.clientHeight;

    this._container.appendChild<HTMLCanvasElement>(this._canvas);
  }

  public ngOnInit()
  {
  }

  public get rgbValues(): Array<RGB>
  {
    // returning direct reference is performant, but opens the data to mutation ... beware :)
    return this._rgbArr;
  }

  public setPreviewImage(imgURL: string): void
  {
    if (this._canvas !== undefined)
    {
      const img: HTMLImageElement = new Image();

      this._url       = imgURL;
      img.crossOrigin = 'anonymous';

      // TODO This only works for a single image load.  As an exercise, modify to handle deletion (including handlers)
      // and re-initializing of a new Image if the setPreviewImage() method is called multiple times
      img.onload = () =>
      {
        // which dimension is binding?
        const w: number = img.width as number;
        const h: number = img.height as number;

        const s1: number = w / this._canvas.width;
        const s2: number = h / this._canvas.height;

        const ctx: CanvasRenderingContext2D = this._canvas.getContext('2d') as CanvasRenderingContext2D;

        let d: number;
        let left: number   = 0;
        let top: number    = 0;
        let right: number  = 0;
        let bottom: number = 0;

        if (s1 >= s2)
        {
          d      = this._canvas.height - (h/s1);
          left   = 0;
          top    = Math.round(0.5*d);
          right  = this._canvas.width;
          bottom = h / s1;
        }
        else
        {
          d      = this._canvas.width - (w/s2);
          left   = Math.round(0.5*d);
          top    = 0;
          right  = w / s2;
          bottom = this._canvas.height;
        }

        ctx.drawImage(img, left, top, right, bottom);

        const data: Uint8ClampedArray = this._canvas.getContext("2d")!.getImageData(left, top, right, bottom).data;

        const n: number = data.length;
        let i: number;

        // process rgb and skip over alpha
        for (i = 0; i < n; i+=4) {
          this._rgbArr.push( {r: data[i], g: data[i+1], b: data[i+2]} );
        }

        this._onLoaded.emit(this._url);
      };

      img.onerror = () => this._onImgError.emit(this._url);

      img.style.display = 'none';
      img.src           = imgURL;
    }
  }
}
