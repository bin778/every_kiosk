import express, { Request, Response } from "express";
import db from "./db"; // db 모듈을 default로 가져옴

const router = express.Router();

// /api/item GET 데이터를 전달받는다.
router.get("/item", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const Item = await db.selectItem();
  res.send({ result: Item });
});

// /api/sets GET 데이터를 전달받는다.
router.get("/sets", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const Sets = await db.selectSets();
  res.send({ result: Sets });
});

// /api/recommenditem GET 데이터를 전달받는다.
router.get("/recommenditem", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const RecommendItem = await db.selectRecommendItem();
  res.send({ result: RecommendItem });
});

// /api/hamburgeritem GET 데이터를 전달받는다.
router.get("/hamburgeritem", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const HamburgerItem = await db.selectHamburgerItem();
  res.send({ result: HamburgerItem });
});

// /api/sideitem GET 데이터를 전달받는다.
router.get("/sideitem", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const SideItem = await db.selectSideItem();
  res.send({ result: SideItem });
});

// /api/drinkitem GET 데이터를 전달받는다.
router.get("/drinkitem", async (req: Request, res: Response) => {
  res.header("Access-Control-Allow-Origin", "*");

  const DrinkItem = await db.selectDrinkItem();
  res.send({ result: DrinkItem });
});

export default router;
