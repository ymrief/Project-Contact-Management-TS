import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";
import { logger } from "./logging";

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Environment variable ${name} is not defined`);
    }

    return value;
}

const adapter = new PrismaMariaDb({
    host: getEnv("DATABASE_HOST"),
    port: Number(getEnv("DATABASE_PORT")),
    user: getEnv("DATABASE_USER"),
    password: process.env.DATABASE_PASSWORD ?? "",
    database: getEnv("DATABASE_NAME"),
});

const prismaClient = new PrismaClient({
    adapter,
}).$extends({
    query: {
        $allOperations: async ({ operation, model, args, query }) => {
            const start = Date.now();

            try {
                const result = await query(args);

                logger.info({
                    type: "prisma-query",
                    model,
                    operation,
                    duration: `${Date.now() - start}ms`,
                });

                return result;
            } catch (error) {
                logger.error({
                    type: "prisma-error",
                    model,
                    operation,
                    error,
                });

                throw error;
            }
        },
    },
});

export default prismaClient;