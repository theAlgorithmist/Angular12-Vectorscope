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
import { RGB } from "../color-types";
import { HSV } from "../color-types";

/**
 * Convert {RGB} to {HSV}
 *
 * @param rgb Single {RGB} value
 */
export function rgbToHsv(rgb: RGB): HSV
{
  const r: number = rgb.r / 255;
  const g: number = rgb.g / 255;
  const b: number = rgb.b / 255;

  const minRGB: number = Math.min(r, g, b);
  const maxRGB: number = Math.max(r, g, b);

  let h: number;
  let s: number;
  let v: number;

  if ( minRGB === maxRGB) {
    return {h :0, s: 0, v: minRGB};
  }

  const d: number = (r === minRGB) ? g-b : ((b === minRGB) ? r-g : b-r);
  const t: number = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5);
  h               = 60 * (t - d/(maxRGB - minRGB));
  s               = (maxRGB - minRGB) / maxRGB;
  v               = maxRGB;

  return {h, s, v};
}

/**
 * Convert an array of {RGB} values to {HSV}
 *
 * @param rgb Input colleciton of {RGB} values
 */
export function rgbToHSVArray(rgb: Array<RGB>): Array<HSV>
{
  const hsv: Array<HSV> = new Array<HSV>();
  const n: number       = rgb.length;

  let r: number;
  let g: number;
  let b: number;
  let minRGB: number;
  let maxRGB: number;
  let h: number;
  let s: number;
  let v: number;
  let d: number;
  let t: number;
  let i: number;

  for (i = 0; i < n; ++i)
  {
    r = rgb[i].r / 255;
    g = rgb[i].g / 255;
    b = rgb[i].b / 255;

    minRGB = Math.min(r, g, b);
    maxRGB = Math.max(r, g, b);

    if (minRGB === maxRGB) {
      hsv.push({h: 0, s: 0, v: minRGB});
    }

    d = (r === minRGB) ? g - b : ((b === minRGB) ? r - g : b - r);
    t = (r === minRGB) ? 3 : ((b === minRGB) ? 1 : 5);
    h = 60 * (t - d / (maxRGB - minRGB));
    s = (maxRGB - minRGB) / maxRGB;
    v = maxRGB;

    hsv.push({h, s, v});
  }

  return hsv;
}
