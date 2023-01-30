import { FastifyInstance } from "fastify";
import webPush from "web-push";
import { z } from "zod";

const publicKey =
  "BEhrHdXqGqpwjnZ5lml_WN_fIGh0heXlJxlaNCxn_dBpKqAxmDCiRRiZJvI1GMMm4hCJtBBaXwR6jSS_IC_WElQ";
const privateKey = "oF40604azgddQ3eCEwmRdc13z8wMXaj9vULo_bsmHPw";

webPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function NotificationsRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    return reply.status(201).send();
  });

  app.post("/push/send", async (req, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(req.body);

    setTimeout(() => {
      webPush.sendNotification(subscription, "Hello do Backend");
    }, 5000);

    return reply.status(201).send();
  });
}
