import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { routesList } from "./routes";


const server = fastify();

server.setValidatorCompiler( validatorCompiler );
server.setSerializerCompiler( serializerCompiler );



server.register( fastifyCors, { origin: "*" } );
server.register( fastifySwagger, {
    openapi: {
        info: {
            title: "Brevly Server",
            version: "1.0.0",
            description: "API to generate and manage short links",
        }
    }
} );
server.register( fastifySwaggerUi, {
    routePrefix: "/docs",
} );

for ( const route of routesList ) {
    server.register( route );
}

server.listen( { port: 3333, host: "0.0.0.0" } ).then( e => {
    console.log( "Server running!!!" )
} )