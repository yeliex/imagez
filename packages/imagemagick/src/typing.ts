import { ReadStream, WriteStream } from 'fs';

// input file| support name| glob| stdin
export type InputFile = string | ReadStream;

export type OutputFile = string | WriteStream;

export type Alpha = 'on' | 'activate' | 'off' | 'deactivate' | 'set' | 'opaque' | 'copy' |
    'transparent' | 'extract' | 'background' | 'shape';

export interface ImageMagickOptions {
    alpha?: Alpha;
    antialias?: boolean;
    authenticate?: string;
    clip?: boolean;
    clipMask?: string;
    clipPath?: string;
    verbose?: boolean;
}

export type Channel =
    'Red'
    | 'Green'
    | 'Blue'
    | 'Alpha'
    | 'Gray'
    | 'Cyan'
    | 'Magenta'
    | 'Yellow'
    | 'Black'
    | 'Opacity'
    | 'Index'
    | 'RGB'
    | 'RGBA'
    | 'CMYK'
    | 'CMYKA';


export interface ImageOperators {
    channel?: Channel;
    grayscale?: string;
    negate?: boolean;
}

export type Debug =
    'None'
    | 'All'
    | 'Trace'
    | 'Accelerate'
    | 'Annotate'
    | 'Blob'
    | 'Cache'
    | 'Coder'
    | 'Configure'
    | 'Deprecate'
    | 'Exception'
    | 'Locale'
    | 'Render'
    | 'Resource'
    | 'Security'
    | 'TemporaryFile'
    | 'Transform'
    | 'X11'
    | 'User';

export interface MiscellaneousOptions {
    debug?: Debug | Debug[];
    log?: string;
}

type Format = string;
type MimeType = string;
type Unit = string;
type ImageType = string;
type ColorSpace = string;

export interface Identify {
    baseName: string;
    format: Format;
    formatDescription: string;
    mimeType: MimeType;
    class: string;
    geometry: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    resolution: { x: number; y: number; }
    printSize: { x: number; y: number; }
    units: Unit;
    type: ImageType;
    baseType: string;
    endianess: string;
    colorspace: ColorSpace;
    depth: number;
    baseDepth: number;
    channelDepth: {
        alpha?: number;
        red: number;
        green: number;
        blue: number;
    }
    pixels: number;
    imageStatistics: any;
    channelStatistics: any;
    renderingIntent: string;
    gamma: number;
    chromaticity: any;
    matteColor: string;
    backgroundColor: string;
    borderColor: string;
    transparentColor: string;
    interlace: string;
    intensity: string;
    compose: string;
    pageGeometry: {
        width: number;
        height: number;
        x: number;
        y: number;
    };
    dispose: string;
    iterations: number;
    compression: string;
    quality?: number;
    orientation: string;
    properties: any;
    profiles: any;
    tainted: boolean;
    filesize: number;
    numberPixels: number;
    pixelsPerSecond: string;
    userTime: string;
    elapsedTime: string;
}
