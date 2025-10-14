declare global {
  interface Metadata {
    pageTitle: string;
    description: string;
    ogType?: string;
    ogImg?: string;
    twitterImgAlt?: string;
    ogArticlePubTime?: string;
    ogArticleAuthors?: Array<string>;
    ogArticleSection?: string;
    ogArticleTags?: Array<string>;
  }
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

  namespace Movie {
    interface Details {
      imdbId: string;
      category: string;
      title: string;
      overview: string;
      releaseDate: string;
      poster: string;
      director: string;
      casts: Array<string>;
      genres: Array<string>;
      slug: string;
      publishedDate: Date;
      body: string;
    }

    interface Crew {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      credit_id: string;
      department: string;
      job: string;
    }
    interface Cast {
      adult: false;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }
    interface Genre {
      id: number;
      name: string;
    }
  }
}

export {};
