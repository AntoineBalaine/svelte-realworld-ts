import type * as ApiTypes from "$lib/ApiTypes";
type Paths = keyof ApiTypes.paths;

type ENDPOINTS_type = {
	ARTICLES: Paths;
	TAGS: Paths;
};

/**
 * would love to be using an enum such as:
  enum ENDPOINTS {
    ARTICLES = <Paths>"/articles"
  }
 * but typescript doesn’t allow it.
 */
export const ENDPOINTS: ENDPOINTS_type = {
	ARTICLES: "/articles",
	TAGS: "/tags"
};
