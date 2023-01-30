import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";
import { NotificationsRoutes } from "./notifications-routes";

const app = Fastify();

app.register(cors);
app.register(appRoutes);
app.register(NotificationsRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => console.log("Server running..."));
