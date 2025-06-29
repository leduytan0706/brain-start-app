/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type Startup = {
  _id: string;
  _type: "startup";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  views?: number;
  description?: string;
  category?: string;
  image?: string;
  pitch?: string;
};

export type Author = {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  bio?: string;
};

export type Markdown = string;

export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type AllSanitySchemaTypes = Startup | Author | Markdown | SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityImageHotspot | SanityImageCrop | SanityFileAsset | SanityImageAsset | SanityImageMetadata | Geopoint | Slug | SanityAssetSourceData;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: sanity/lib/queries.ts
// Variable: STARTUPS_QUERY
// Query: *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){        _id,         title,         slug,         description,         image,         _createdAt,         author -> {            _id,             name,             image,            bio        },         views,        pitch,         category    }
export type STARTUPS_QUERYResult = Array<{
  _id: string;
  title: null;
  slug: null;
  description: null;
  image: string | null;
  _createdAt: string;
  author: null;
  views: null;
  pitch: null;
  category: null;
} | {
  _id: string;
  title: string | null;
  slug: null;
  description: string | null;
  image: null;
  _createdAt: string;
  author: null;
  views: null;
  pitch: null;
  category: null;
} | {
  _id: string;
  title: string | null;
  slug: Slug | null;
  description: string | null;
  image: string | null;
  _createdAt: string;
  author: {
    _id: string;
    name: string | null;
    image: string | null;
    bio: string | null;
  } | null;
  views: number | null;
  pitch: string | null;
  category: string | null;
}>;
// Variable: STARTUP_BY_ID_QUERY
// Query: *[_type == 'startup' && _id == $id][0]{        _id,         title,         slug,         description,         image,         _createdAt,         author -> {            _id,             name,             username,            image,            bio        },         views,         category,        pitch    }
export type STARTUP_BY_ID_QUERYResult = {
  _id: string;
  title: string | null;
  slug: Slug | null;
  description: string | null;
  image: string | null;
  _createdAt: string;
  author: {
    _id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
  } | null;
  views: number | null;
  category: string | null;
  pitch: string | null;
} | null;
// Variable: STARTUP_VIEWS_QUERY
// Query: *[_type == 'startup' && _id == $id][0]{        _id,        views    }
export type STARTUP_VIEWS_QUERYResult = {
  _id: string;
  views: number | null;
} | null;
// Variable: AUTHOR_BY_GITHUB_ID_QUERY
// Query: *[_type == 'author' && id == $id][0]{        _id,        id,         image,        email,        name,        username,        bio    }
export type AUTHOR_BY_GITHUB_ID_QUERYResult = {
  _id: string;
  id: number | null;
  image: string | null;
  email: string | null;
  name: string | null;
  username: string | null;
  bio: string | null;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n    *[_type == 'startup' && defined(slug.current) && !defined($search) || title match $search || category match $search || author->name match $search] | order(_createdAt desc){\n        _id, \n        title, \n        slug, \n        description, \n        image, \n        _createdAt, \n        author -> {\n            _id, \n            name, \n            image,\n            bio\n        }, \n        views,\n        pitch, \n        category\n    }": STARTUPS_QUERYResult;
    "\n    *[_type == 'startup' && _id == $id][0]{\n        _id, \n        title, \n        slug, \n        description, \n        image, \n        _createdAt, \n        author -> {\n            _id, \n            name, \n            username,\n            image,\n            bio\n        }, \n        views, \n        category,\n        pitch\n    }": STARTUP_BY_ID_QUERYResult;
    "\n    *[_type == 'startup' && _id == $id][0]{\n        _id,\n        views\n    }": STARTUP_VIEWS_QUERYResult;
    "\n    *[_type == 'author' && id == $id][0]{\n        _id,\n        id, \n        image,\n        email,\n        name,\n        username,\n        bio\n    }": AUTHOR_BY_GITHUB_ID_QUERYResult;
  }
}
