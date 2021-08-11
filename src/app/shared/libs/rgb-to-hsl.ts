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
  RGB,
  HSL
} from "../color-types";

/**
 * Convert {RGB} to {HSL}
 *
 * @param value Input {RGB}
 */
export function rgbToHsl(value: RGB): HSL
{
  // normalize
  const r: number = value.r / 255;
  const g: number = value.g / 255;
  const b: number = value.b / 255;

  // min/max channel values
  const cMin: number = Math.min(r, g, b);
  const cMax: number = Math.max(r, g, b);
  const delta: number = cMax - cMin;

  let h: number = 0;
  let s: number = 0;
  let l: number = 0;

  // which is max? r, b, or b?
  if (delta === 0)
    h = 0;
  else if (cMax == r)
    h = ((g - b) / delta) % 6;
  else if (cMax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
  l = 0.5*(cMax + cMin);
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2*l - 1));

  return {h, s, l};
}

/**
 * Convert an Array of {RGB} values to {HSL}
 *
 * @param values Input collection of {RGB} values
 */
export function rgbToHslArr(values: Array<RGB>): Array<HSL>
{
  const hsl: Array<HSL> = new Array<HSL>();
  const n: number       = values.length;
  let i: number;

  let r: number;
  let g: number;
  let b: number;
  let cMin: number;
  let cMax: number;
  let delta: number;
  let h: number;
  let s: number;
  let l: number;

  for (i = 0; i < n; ++i)
  {
    // normalize
    r = values[i].r / 255;
    g = values[i].g / 255;
    b = values[i].b / 255;

    // min/max channel values
    cMin  = Math.min(r, g, b);
    cMax  = Math.max(r, g, b);
    delta = cMax - cMin;

    // which is max? r, b, or b?
    if (delta === 0)
      h = 0;
    else if (cMax == r)
      h = ((g - b) / delta) % 6;
    else if (cMax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    l = 0.5 * (cMax + cMin);
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    hsl.push({h, s, l});
  }

  return hsl;
}
