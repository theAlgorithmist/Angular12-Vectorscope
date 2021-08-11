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
import {
  Injectable,
  NgZone,
} from '@angular/core';

import { CONFIG } from "../data/config";
import {
  HSV,
  HSL
} from "../color-types";

const DEG_TO_RAD: number = Math.PI / 180;

/**
 * Angular Service to manage vectorscope display in a provided HTML Canvas
 *
 * @author Jim Armstrong
 *
 * @version 1.0
 */
@Injectable({providedIn: "root"})
export class VectorscopeService
{
  protected readonly BUFFER = 10;

  protected _width: number;
  protected _height: number;

  protected _context!: CanvasRenderingContext2D;

  constructor(protected _zone: NgZone)
  {
    this._width  = 0;
    this._height = 0;
  }

  public get width(): number
  {
    return this._width;
  }

  public get height(): number
  {
    return this._height;
  }

  public set canvas(surface: HTMLCanvasElement)
  {
    if (surface !== undefined && surface != null)
    {
      this._context = surface.getContext('2d') as CanvasRenderingContext2D;
      this._width   = surface.width;
      this._height  = surface.height;
    }
  }

  public create(values: Array<HSV>): void
  {
    if (this._context === undefined || this._context == null) {
      return;
    }

    // midpoint of vectorscope display
    const midX: number = Math.round(0.5*this._width);
    const midY: number = Math.round(0.5*this._height);

    // radius
    const r: number = Math.round(0.5*(Math.min(this._width, this._height))) - this.BUFFER;

    const n: number = values.length;
    let i: number;
    let value: HSV;
    let x: number;
    let y: number;
    let angle: number;

    // plot points
    for (i = 0; i < n; ++i)
    {
      value = values[i];
      angle = value.h*DEG_TO_RAD;
      x     = midX + (value.s*r) * Math.cos(angle);
      y     = midY + (value.s*r) * Math.sin(angle);

      this._context.fillStyle = `rgba(255, 255, 255, ${value.v})`;
      this._context.fillRect(x, y, 1, 1);
    }

    this._context.beginPath();
    this._context.arc(midX, midY, r, 0, 2 * Math.PI, false);
    this._context.lineWidth   = 2;
    this._context.strokeStyle = CONFIG.vectorscopeLines;
    this._context.stroke();

    this._context.strokeStyle = CONFIG.vectorscopeAxes;
    this._context.lineWidth   = 1;
    this._context.beginPath();

    this._context.moveTo(this.BUFFER, midY);
    this._context.lineTo(this._width-this.BUFFER, midY);

    this._context.moveTo(midX, this.BUFFER);
    this._context.lineTo(midX, this._height-this.BUFFER);

    this._context.stroke();
  }
}
