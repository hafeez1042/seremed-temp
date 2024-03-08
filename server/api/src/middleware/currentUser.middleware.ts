import { IJWTUserData } from "@quadspire/sd-shared/lib/types/user";
import userRepository from "../repository/UserRepository";
import { NotAuthorizedError } from "../errors/NotAuthorizedError";
import { RequestHandler } from "express";
import companyRepository from "../repository/CompanyRepository";

export const currentUserMiddleware: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  // Check that the request contains a token
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    // Validate the token
    const base64String = req.headers.authorization.split(" ")[1].split(".")[1];
    const data: IJWTUserData = JSON.parse(
      Buffer.from(base64String, "base64").toString("utf-8"),
    );

    const isUserCreateCall =
      req.originalUrl === "/v1/users" && req.method === "POST";

    if (isUserCreateCall) {
      req.jwtData = data;
      return next();
    }

    const user = await userRepository.getByCognitoId(data.username);

    if (!user) {
      throw new NotAuthorizedError("Invalid token");
    }

    const company = await companyRepository.getByUserId(user._id);

    req.currentUser = { ...data, ...user };
    req.company = company || undefined;
    next();
  } else {
    throw new NotAuthorizedError("No token provided");
  }
};
