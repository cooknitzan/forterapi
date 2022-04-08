import express, { Router } from "express";
import getCoins from "../../controllers/coins/get-coins";
import convertCoins from "../../controllers/coins/convert-coins";

const router: Router = express.Router();

router.route("/:ids").get(getCoins);
router.route("/").get(convertCoins);

module.exports = router;
