declare global {
  namespace Spotify {
    interface Track {
      id: string;
      name: string;
      artists: Array<{
        name: string;
      }>;
      album: {
        name: string;
        images: Array<{
          height: number;
          width: number;
          url: string;
        }>;
      };
      external_urls: {
        spotify: string;
      };
    }
  }
}

export {};
