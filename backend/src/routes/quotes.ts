import { Router, Request, Response } from "express";
import { getQuotesByCategory, getAllQuotes } from "../services/yahooFinance";
import { ALL_CATEGORIES, Category } from "../config/symbols";

const router = Router();

// GET /api/quotes?category=jp|us|crypto|fx
router.get("/", async (req: Request, res: Response) => {
  const category = (Array.isArray(req.query.category) ? req.query.category[0] : req.query.category) as Category;
  if (!ALL_CATEGORIES.includes(category)) {
    res.status(400).json({
      error: `category must be one of: ${ALL_CATEGORIES.join(", ")}`,
    });
    return;
  }
  try {
    const data = await getQuotesByCategory(category);
    res.json(data);
  } catch (err) {
    console.error("Quote fetch error:", err);
    res.status(502).json({ error: "Failed to fetch quotes from Yahoo Finance" });
  }
});

// GET /api/quotes/all
router.get("/all", async (_req: Request, res: Response) => {
  try {
    const data = await getAllQuotes();
    res.json(data);
  } catch (err) {
    console.error("All quotes fetch error:", err);
    res.status(502).json({ error: "Failed to fetch quotes from Yahoo Finance" });
  }
});

// GET /api/quotes/:symbol
router.get("/:symbol", async (req: Request, res: Response) => {
  const rawSymbol = req.params["symbol"];
  const symbol = Array.isArray(rawSymbol) ? rawSymbol[0] : rawSymbol;
  try {
    const yf = await import("yahoo-finance2");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = await (yf.default.quote as any)(decodeURIComponent(symbol));
    res.json(r);
  } catch (err) {
    console.error(`Single symbol fetch error for ${symbol}:`, err);
    res.status(502).json({ error: `Failed to fetch quote for ${symbol}` });
  }
});

export default router;
