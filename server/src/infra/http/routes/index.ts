import { addAccessCountRoute } from "./addAccessCount";
import { createShortenedLinkRoute } from "./createShortenedLink";
import { deleteShortenedLinksRoute } from "./deleteShortenedLink";
import { getShortenedLinksRoute } from "./getShortenedLinks";

const routes = {
    createShortenedLinkRoute,
    getShortenedLinksRoute,
    deleteShortenedLinksRoute,
    addAccessCountRoute
}

export const routesList = Object.values( routes );