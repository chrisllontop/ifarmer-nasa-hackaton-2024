import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import User from '../user/user.schema';

const authenticator = (app: Elysia) =>
  app
    .use(
      jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET || 'secret',
      })
    )
    .derive(async ({ jwt, headers: { authorization }, set }) => {
      if (!authorization) {
        // handle error for access token is not available
        set.status = "Unauthorized";
        throw new Error("Access token is missing");
      }
      const jwtPayload = await jwt.verify(authorization.replace("Bearer ", ""));
      if (!jwtPayload) {
        // handle error for access token is tempted or incorrect
        set.status = "Forbidden";
        throw new Error("Access token is invalid");
      }

      const user = await User.findOne({ email:jwtPayload.email });

      if (!user) {
        // handle error for user not found from the provided access token
        set.status = "Forbidden";
        throw new Error("Access token is invalid");
      }

      return {
        user,
      };
    });

export { authenticator };
