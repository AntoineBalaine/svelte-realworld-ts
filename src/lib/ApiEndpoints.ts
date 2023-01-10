import type * as ApiTypes from "$lib/ApiTypes";
type Paths = keyof ApiTypes.paths;

/**
 * would love to be using an enum with typed values such as:
  enum ENDPOINTS {
    ARTICLES = <Paths>"/articles"
  }
 * but typescript allows it only for numbers
 */
export const ENDPOINTS = {
	ARTICLES: <Paths>"/articles",
	FEED: <Paths>"/articles/feed",
	ARTICLES_FAVORITE: <Paths>"/articles/{slug}/favorite",
	COMMENTS: <Paths>"/articles/{slug}/comments",
	TAGS: <Paths>"/tags",
	USER: <Paths>"/user",
	PROFILE: <Paths>"/profiles/{username}",
	FOLLOW: <Paths>"/profiles/{username}/follow",
	CREATE_USER: <Paths>"users",
	LOGIN: <Paths>"/users/login"
};
