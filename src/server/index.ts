import express, { Express, Request, Response } from "express";
import { config } from "./config";
import { render } from "./render";
import axios from "axios";
import { getGalaxiesJSON } from "../app/api";

const app: Express = express();

app.use(express.static("dist"));

app.get("/galaxias", async (req: Request, res: Response) => {
  try {
    const data = await getGalaxiesJSON();
    const initialProps = {
      galaxies: data,
    };

    res.send(render(req.url, initialProps));
  } catch (error) {
    throw new Error("An error occurred in /galaxias", error);
  }
});

app.get("*", (req: Request, res: Response) => {
  res.send(render(req.url));
});

app.listen(config.PORT, () => {
  console.log(`Listening on port http://localhost:${config.PORT}`);
});
