# Angular Version 12 Vectorscope

Are you just starting out with Angular?  Would you like to integrate HTML Canvas into your applications without a third-party library?  If so, then this project was tailor-made just for you!  This demo illustrates how to create a primitive Vectorscope in Angular version 12.  The scope is accompanied by an image previewer that simulates the display of a single frame of video.  Both the image previewer and the Vectorscope are rendered into an HTML Canvas.  The canvas is manipulated directly instead of through a third-party library such as Pixi JS or Fabric JS.

For more detail on the project, please read the Medium article [Creating a Vectorscope in Angular](https://medium.com/ngconf/creating-a-vectorscope-in-angular-12-a581a169590a).

Author:  Jim Armstrong - [The Algorithmist](https://www.linkedin.com/in/jimarmstrong/)

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 12.0.1

Angular CLI: 12.0.1

Typescript: 4.2.3

## Introduction

A Vectorscope is one of several _scopes_ that are used in the process of analyzing and color grading video.  In general, scopes provide specific and accurate information about the color components of a single video frame.  This helps the colorist detect issues with a video that may not be immediately visible on a monitor.  These include dominance of a single color channel (RGB), too much yellow in a frame, or quickly detecting colors in the frame that are not broadcast safe.

Vectorscopes provide a visual color representation of a single video frame in polar coordinates.  One color component is plotted radially from 0 to 360 degrees.  Another color component determines length along the radius from the origin.  A third color component is often used to compute the greyscale of a dot or a color that is plotted at the specific polar coordinate.  The Vectorscope consists of a plot of one point for every pixel in the image.  The resulting display illustrates how color is distributed throughout the image or video frame.

Refer to the Medium article above for pictures of a Vectorscope from Davinci Resolve Studio.

The color information that is plotted on a Vectorscope is derived from a color model.  The application provided in this code distribution uses the HSV (Hue, Saturation, Value) model.  HSV is derived from the RGB (Red, Green, Blue) color values from each pixel.  The Angular Vectorscope is greyscale, so the polar coordinate angle is determined by the hue (from 0 to 360).  Distance from the origin is determined by the saturation (from 0 to 1).  The alpha value of the point is determined by the HSV value (from 0 to 1).

How the hue is mapped to a specific angle depends on the color wheel model used in an application.  If you Google 'color wheel image' you will find that there is not a single representation of a color wheel.  The wheel is used to create a gamut of colors from a basis or set of primaries.  The wheel model used in this application mimics that used in Davinci Resolve Studio, which is based on Red, Blue, and Yellow primaries.

Refer to the Medium article for more detail.

## Working with Canvas

This demo illustrates two ways of working directly with an HTML Canvas in an Angular application.  The first is to employ an Angular _Service_.  This is the approach used for the Vectorscope display.  The service accepts a reference to an _HTMLCanvasElement_ and then initializes an internal rendering context.  This allows the Vectorscope canvas to be defined in markup as shown below (see _app.component.html_).

``` 
<canvas
  #vectorscope
  width="400"
  height="400"
  id="vectorscopeSurface">
</canvas>
```

The image previewer is implemented as an Angular attribute _Directive_.  This directive creates a new Canvas and assigns it as a child of the container in which the directive is used.  Angular _Inputs_ and _Output_ handlers may be assigned on this container as shown below (_app.component.html_).

```
<div class="preview-container" img-preview (imgError)="onImageError($event)" (imgLoaded)="onImageLoaded($event)"></div>
```

Each HTML Canvas is directly manipulated using native Canvas methods instead of working through a third-party library.  I hope you find some helpful information in this project.


## Running The Application

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.  Then, click the 'Load Image' button.  The image is loaded into the application and resized for the image previewer.  The RGB components of each pixel in the resized image are extracted and converted into a HSV model.  The HSV model is used to create the Vectorscope display, which is immediately below the image previewer.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Build

Run `ng build` to build the project. The build artifacts are stored in the `dist/` directory.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
