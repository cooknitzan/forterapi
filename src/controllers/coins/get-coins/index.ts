import axios from "axios";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { BadRequestError } from "../../../errors/error-types/bad-request-error";
import { COIN_URI, CONVERT_FROM, CONVERT_TO } from "../../../consts/consts";
import { CoinsResponse } from "../../../response/response-types/coins-response";

const getCoins = async (req: Request, res: Response, next: NextFunction) => {
  const ids: string | undefined = req.params.ids;
  const url: string = COIN_URI + CONVERT_FROM + ids + "&" + CONVERT_TO + "usd";

  try {
    const { data } = await axios.get(url);
    if (data.Response === "Error") {
      throw new BadRequestError("please provide valid coins");
    }

    const response: CoinsResponse = new CoinsResponse(data);
    res.status(200).json(response.serializeResponse());
  } catch (error) {
    next(error);
  }
};

export default getCoins;
