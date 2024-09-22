export interface ImageProps {
  id: string;
  urls: {
    thumbs: string;
    small: string;
    regular: string;
  };
  alt_description: string;
}
