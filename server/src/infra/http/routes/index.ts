import { createShortenedLink } from "./createShortenedLink";
import { getShortenedLinks } from "./getShortenedLinks";

const routes = {
    createShortenedLink,
    getShortenedLinks
}

export const routesList = Object.values( routes );