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
  HSV,
  HSL
} from "../color-types";

/**
 * Convert hue value in HSL or HSV model to conform to Resolve Studio color wheel layout
 *
 * @param value {HSL} or {HSV} model; the hue value is mutated in-place
 */
export function toResolveColorWheel(value: HSV | HSL): void
{
  value.h = (value.h + 240) % 360;
}

/**
 * Convert hue value in HSL or HSV model to conform to Resolve Studio color wheel layout
 *
 * @param value Array of {HSL} or {HSV} models; the hue value is mutated in-place for each value
 */
export function toResolveColorWheelArr(values: Array<HSV | HSL>): void
{
  const n: number = values.length;
  let i: number;

  for (i = 0; i < n; ++i) {
    values[i].h = (values[i].h + 240) % 360;
  }
}
