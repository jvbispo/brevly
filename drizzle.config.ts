import { env } from "@/env";
import type { Config } from "drizzle-kit";

export default {
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    dialect: 'postgresql',
    schema: './server/src/infra/db/schemas/*.ts',
    out: './server/src/infra/db/migrations/',
} satisfies Config;