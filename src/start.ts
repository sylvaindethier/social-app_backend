import Fastify from "fastify";
// * .env config * //
import { is_DEV } from "./env.ts";
const PORT_DEFAULT = 3000;

const NODE_ENV = process.env["NODE_ENV"] as string;
const envLogger = {
  development: {
    level: "info",
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
      },
    },
  },
  test: false,
  production: { level: "error" },
};
const fastify = Fastify({
  logger: envLogger[NODE_ENV as keyof typeof envLogger] ?? true,
});

// ******************* //
// * Swagger with UI * //
// ******************* //
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
if (is_DEV) {
  const fastifySwagger_Options = {};
  fastify.register(fastifySwagger, fastifySwagger_Options);

  const fastifySwaggerUI_Options = {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "API",
      },
    },
  };
  fastify.register(fastifySwaggerUI, fastifySwaggerUI_Options);

  // disable logger
  fastify.addHook("onRoute", (routeOptions) => {
    if (routeOptions.url.startsWith(fastifySwaggerUI_Options.routePrefix)) {
      routeOptions.logLevel = "silent";
    }
  });
}

// ****************** //
// * Import plugins * //
// ****************** //
// import fastifyCORS from "@fastify/cors";
// const fastifyCORS_Options = {};
// fastify.register(fastifyCORS, fastifyCORS_Options);

import fastifyFormbody from "@fastify/formbody";
const fastifyFormbody_Options = {};
fastify.register(fastifyFormbody, fastifyFormbody_Options);

// import fastifyCookie from "@fastify/cookie";
// const fastifyCookie_Options = {};
// fastify.register(fastifyCookie, fastifyCookie_Options);

// ***************** //
// * Import routes * //
// ***************** //

// *** User routes *** //
import { userRoutes } from "#domains/User/routes.ts";
fastify.register(userRoutes, { prefix: "api/users" });

// **************** //
// * Start server * //
// **************** //
import { db_connect, db_disconnect } from "./db/connect.ts";
async function start(port: number) {
  try {
    await db_connect();

    // Add GET "/ping" route
    fastify.get("/ping", async () => ({ status: "OK" }));

    // Listen to port
    await fastify.listen({ port });
  } catch (error) {
    fastify.log.error(error);
    await db_disconnect();
    process.exit(1);
  }
}
await start(Number(process.env["PORT"]) || PORT_DEFAULT);
