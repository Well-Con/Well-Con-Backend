import express from "express";

import type { Request, Response } from "express";

import chalk from "chalk";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";

import cors from "cors";

import bodyParser from "body-parser";

import {
  InternalServerErrorResponse,
  SuccessResponse,
} from "./utils/responses";
import logger from "./utils/logger";

import v1Router from "./routes";

const app = express();

morgan.token("colored-method", (req, res) => {
  const method = req.method;
  switch (method) {
    case "GET":
      return chalk.bgGreen.black.bold(` ${method} `);
    case "POST":
      return chalk.bgBlue.white.bold(` ${method} `);
    case "PUT":
      return chalk.bgYellow.black.bold(` ${method} `);
    case "DELETE":
      return chalk.bgRed.white.bold(` ${method} `);
    default:
      return chalk.bgWhite.black.bold(` ${method} `);
  }
});

morgan.token("colored-status", (req, res) => {
  const status = res.statusCode;
  if (status >= 500) return chalk.bgRed.white.bold(` ${status} `);
  if (status >= 400) return chalk.bgYellow.black.bold(` ${status} `);
  if (status >= 300) return chalk.bgCyan.black.bold(` ${status} `);
  if (status >= 200) return chalk.bgGreen.black.bold(` ${status} `);
  return chalk.bgWhite.black.bold(` ${status} `);
});

morgan.token("iso-date", () => new Date().toISOString());

app.use(helmet());

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens["colored-method"]?.(req, res) || chalk.bgWhite.black.bold(` ${req.method} `), // Colored HTTP method
      chalk.white(tokens?.url?.(req, res)), // URL
      tokens["colored-status"]?.(req, res), // Colored status
      chalk.gray(tokens?.res?.(req, res, "content-length") + "b"), // Size
      "-",
      chalk.magenta(tokens["response-time"]?.(req, res) + " ms"), // Response time
      chalk.blue(tokens["remote-addr"]?.(req, res)), // IP
      chalk.gray("[" + tokens["iso-date"]?.(req, res) + "]"), // Date
    ].join(" ");
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().none());
app.use(
  cors({
    origin: [
      "http://localhost:4000",
      "https://yt-transcriber-frontend.vercel.app",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use("/v1", v1Router);

app.get("/", (_: Request, res: Response) => {
  try {
    logger.info("Welcome to backend!", {
      file: "index.js",
      timestamp: new Date().toISOString,
    });
    return SuccessResponse.send(res, {}, "Welcome to backend!");
  } catch (error: any) {
    logger.error(`Error in getting root: ${error.message}`, error);
    return InternalServerErrorResponse.send(res, "Internal Server Error");
  }
});

export default app;
