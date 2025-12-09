const request = require("supertest");
const createApp = require("../app");
const tradeRepository = require("../repositories/tradeRepository");

describe("Position Routes", () => {
  let app;

  beforeAll(() => {
    app = createApp();
  });

  beforeEach(() => {
    tradeRepository.clearAll();
  });

  async function dummyTrades() {
    // ACC123 - AAPL: BUY 100 @ 150, SELL 40 @ 160
    await request(app).post("/api/trades").send({
      accountId: "ACC123",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150,
    });

    await request(app).post("/api/trades").send({
      accountId: "ACC123",
      ticker: "AAPL",
      side: "SELL",
      quantity: 40,
      price: 160,
    });

    // ACC124 - MSFT: BUY 50 @ 300
    await request(app).post("/api/trades").send({
      accountId: "ACC124",
      ticker: "MSFT",
      side: "BUY",
      quantity: 50,
      price: 300,
    });
  }

  test("GET /api/positions should return aggregated positions for all accounts", async () => {
    await dummyTrades();

    const res = await request(app).get("/api/positions").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    // 2 positions: ACC123-AAPL, ACC124-MSFT
    expect(res.body.length).toBe(2);

    const acc1Aapl = res.body.find(
      (p) => p.accountId === "ACC123" && p.ticker === "AAPL"
    );
    const acc2Msft = res.body.find(
      (p) => p.accountId === "ACC124" && p.ticker === "MSFT"
    );

    expect(acc1Aapl).toBeDefined();
    expect(acc2Msft).toBeDefined();

    // ACC1 AAPL: net qty = 100 - 40 = 60
    expect(acc1Aapl.netQuantity).toBe(60);
    // avg price = (100*150 - 40*160) / 60 = 8600 / 60 = 143.3333
    expect(acc1Aapl.averagePrice).toBeCloseTo(143.3333, 4);
    expect(acc1Aapl.lastTradePrice).toBe(160);
    expect(acc1Aapl.grossNotional).toBe(100 * 150 + 40 * 160);

    // ACC2 MSFT: long position
    expect(acc2Msft.netQuantity).toBe(50);
    expect(acc2Msft.averagePrice).toBe(300);
    expect(acc2Msft.lastTradePrice).toBe(300);
    expect(acc2Msft.grossNotional).toBe(50 * 300);
  });

  test("GET /api/positions/:accountId should return positions only for that account", async () => {
    await dummyTrades();

    const res = await request(app).get("/api/positions/ACC123").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);

    const position = res.body[0];
    expect(position.accountId).toBe("ACC123");
    expect(position.ticker).toBe("AAPL");
    expect(position.netQuantity).toBe(60);
  });

  test("GET /api/positions/:accountId should return empty array if no trades", async () => {
    const res = await request(app).get("/api/positions/UNKNOWN").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });
});
