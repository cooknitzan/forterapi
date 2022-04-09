import axios from "axios";
import { NextFunction, Request, Response } from "express";
import path from "path";
import { COIN_URI, CONVERT_FROM, CONVERT_TO } from "../../../consts/consts";
import { BadRequestError } from "../../../errors/error-types/bad-request-error";
import { ConvertCoinsResponse } from "../../../response/response-types/convert-coins-response";

const convertCoins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { convertTo, convertFrom } = req.query;

  try {
    if (!convertTo && !convertFrom) {
      const options: object = {
        root: path.join(__dirname, "../../../documentation"),
      };
      res.status(200).sendFile("index.html", options);
    } else {
      if (!convertTo) {
        throw new BadRequestError("please provide convertTo coins");
      }

      if (!convertFrom) {
        throw new BadRequestError("please provide convertFrom coins");
      }
      const url: string =
        COIN_URI + CONVERT_FROM + convertFrom + "&" + CONVERT_TO + convertTo;

      const { data } = await axios.get(url);

      if (data.Response === "Error") {
        throw new BadRequestError("please provide valid coins");
      }

      const response: ConvertCoinsResponse = new ConvertCoinsResponse(data);
      res.status(200).json(response.serializeResponse());
    }
  } catch (error) {
    next(error);
  }
};

export default convertCoins;
