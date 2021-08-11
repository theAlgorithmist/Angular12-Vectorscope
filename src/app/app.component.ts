/**
 * Copyright 2021 Jim Armstrong
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
 * Main app component for the Angular Vectorscope
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit
} from '@angular/core';

import { VectorscopeService } from "./shared/services/vectorscope.service";

import { ImgPreviewDirective } from "./shared/directives/img-preview.directive";

import {
  RGB,
  HSV,
  HSL
} from "./shared/color-types";

import { rgbToHSVArray } from "./shared/libs/rgb-to-hsv";

import { toResolveColorWheelArr } from "./shared/libs/to-resolve-color-wheel";

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  @ViewChild('vectorscope', {static: true})
  private _canvas!: ElementRef<HTMLCanvasElement>;            // HTML Canvas in which the vectorscope is rendered

  @ViewChild(ImgPreviewDirective, {static: true})
  private _imagePreview!: ImgPreviewDirective;                // Image Previewer

  constructor(private _vectorscope: VectorscopeService)
  {
    // empty
  }

  /**
   * Angular life-cycle on init
   */
  public ngOnInit(): void
  {
    if (this._canvas !== undefined && this._canvas != null) {
      this._vectorscope.canvas = this._canvas.nativeElement;
    }
  }

  /**
   * Execute whenever the 'Load Image' button is clicked
   */
  public onLoadImage(): void
  {
    // load the image to be analyzed in the vectorscope (simulate one frame of video)
    if (this._imagePreview !== undefined) {
      this._imagePreview.setPreviewImage('/assets/images/drone-photo.jpg');
    }
  }

  /**
   * Execute when the preview image is successfully loaded
   *
   * @param url URL of the preview image
   */
  public onImageLoaded(url: string): void
  {
    const rgbValues: Array<RGB> = this._imagePreview.rgbValues;
    const hsv: Array<HSV>       = rgbToHSVArray(rgbValues);

    // convert to Resolve Studio color wheel layout and create vectorscope display
    toResolveColorWheelArr(hsv);

    this._vectorscope.create(hsv);
  }

  /**
   * Execute if there is an error loading the preview image
   *
   * @param url URL of the preview image
   */
  public onImageError(url: string): void
  {
    console.log('error loading preview image:', url);
  }
}
