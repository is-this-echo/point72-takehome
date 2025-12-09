const request = require("supertest");
const createApp = require("../app");
const tradeRepository = require("../repositories/tradeRepository");

describe("Trade Routes", () => {
  let app;

  // test setup
  beforeAll(() => {
    app = createApp();
  });

  // test teardown, clear the in-memory db before each test
  beforeEach(() => {
    tradeRepository.clearAll();
  });

  test("POST /api/trades should create a trade with valid payload", async () => {
    const payload = {
      accountId: "ACC123",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150.5,
    };

    const res = await request(app)
      .post("/api/trades")
      .send(payload)
      .expect(201);

    expect(res.body).toMatchObject({
      accountId: "ACC123",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150.5,
    });

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("tradeTime");
  });

  test("POST /api/trades should return 400 for invalid payload", async () => {
    const payload = {
      // missing accountId, caught by payload validation code
      ticker: "AAPL",
      side: "INVALID",
      quantity: -10, // negative qty
      price: 0,
    };

    const res = await request(app)
      .post("/api/trades")
      .send(payload)
      .expect(400);

    expect(res.body).toHaveProperty("message", "Invalid trade payload");
    expect(Array.isArray(res.body.details)).toBe(true);
    expect(res.body.details.length).toBeGreaterThan(0);
  });

  test("GET /api/trades should return all trades", async () => {
    // add dummy trades
    await request(app).post("/api/trades").send({
      accountId: "ACC123",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150,
    });

    await request(app).post("/api/trades").send({
      accountId: "ACC124",
      ticker: "NVDA",
      side: "SELL",
      quantity: 50,
      price: 300,
    });

    const res = await request(app).get("/api/trades").expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("GET /api/trades should filter by accountId and ticker", async () => {
    await request(app).post("/api/trades").send({
      accountId: "ACC1",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150,
    });

    await request(app).post("/api/trades").send({
      accountId: "ACC1",
      ticker: "MSFT",
      side: "BUY",
      quantity: 200,
      price: 250,
    });

    await request(app).post("/api/trades").send({
      accountId: "ACC2",
      ticker: "AAPL",
      side: "SELL",
      quantity: 50,
      price: 155,
    });

    const res = await request(app)
      .get("/api/trades")
      .query({ accountId: "ACC1", ticker: "AAPL" })
      .expect(200);

    expect(res.body.length).toBe(1);
    expect(res.body[0]).toMatchObject({
      accountId: "ACC1",
      ticker: "AAPL",
    });
  });

  test("GET /api/trades/:id should return a trade if found", async () => {
    const createRes = await request(app).post("/api/trades").send({
      accountId: "ACC1",
      ticker: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 150,
    });

    const id = createRes.body.id;

    const res = await request(app).get(`/api/trades/${id}`).expect(200);

    expect(res.body).toHaveProperty("id", id);
    expect(res.body).toHaveProperty("ticker", "AAPL");
  });

  test("GET /api/trades/:id should return 404 if not found", async () => {
    const res = await request(app).get("/api/trades/9999").expect(404);

    expect(res.body).toHaveProperty("message", "Trade not found");
  });
});
