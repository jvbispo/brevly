import { createShortenedLinkRoute } from "./createShortenedLink";
import { deleteShortenedLinksRoute } from "./deleteShortenedLink";
import { getShortenedLinksRoute } from "./getShortenedLinks";

const routes = {
    createShortenedLinkRoute,
    getShortenedLinksRoute,
    deleteShortenedLinksRoute
}

export const routesList = Object.values( routes );