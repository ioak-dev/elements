/* eslint-disable camelcase */
export interface BackgroundType {
  source: 'SOLID-COLOR' | 'UNSPLASH' | 'IMAGE';
  meta: ImageMeta | any;
  data: UnsplashData | any;
}

export interface ImageMeta {
  overlayIntensity:
    | 'none'
    | 'ultralow'
    | 'low'
    | 'moderate'
    | 'heavy'
    | 'intense';
  overlayColor: string;
  parallax: boolean;
}

export interface UnsplashData {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
}
