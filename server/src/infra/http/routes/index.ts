import { addAccessCountRoute } from "./addAccessCount";
import { createShortenedLinkRoute } from "./createShortenedLink";
import { deleteShortenedLinksRoute } from "./deleteShortenedLink";
import { downloadCsvRoute } from "./downloadCsv";
import { getShortenedLinksRoute } from "./getShortenedLinks";

const routes = {
    createShortenedLinkRoute,
    getShortenedLinksRoute,
    deleteShortenedLinksRoute,
    addAccessCountRoute,
    downloadCsvRoute
}

export const routesList = Object.values( routes );