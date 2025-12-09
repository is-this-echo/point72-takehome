## REST API - trades & positions

### Project Setup

In project root directory:

`npm install`

`npm run dev` -> run using nodemon

<img width="776" height="392" alt="arsfaw" src="https://github.com/user-attachments/assets/7dd3ff67-f07f-4ada-b051-67085fc56d0b" />

or

`npm start` -> run normally

<br/>

### Run Unit Tests

`npm test`

<br/>

### Endpoint details

Use Postman or curl to call the api endpoints :

- Creating a trade :

```
POST http://localhost:3000/api/trades

 {
    "accountId": "ACC123",
    "ticker": "AAPL",
    "side": "BUY",
    "quantity": 100,
    "price": 150.5
  }
```

<br/>

- Get all trades :

```
GET http://localhost:3000/api/trades
```

```
[
    {
        "id": "1",
        "accountId": "ACC123",
        "ticker": "AAPL",
        "side": "BUY",
        "quantity": 100,
        "price": 150.5,
        "tradeTime": "2025-12-08T16:09:13.024Z",
        "metadata": null
    },
    {
        "id": "2",
        "accountId": "ACC123",
        "ticker": "AAPL",
        "side": "BUY",
        "quantity": 100,
        "price": 150.5,
        "tradeTime": "2025-12-08T16:55:42.021Z",
        "metadata": null
    },
    {
        "id": "3",
        "accountId": "ACC124",
        "ticker": "NVDA",
        "side": "BUY",
        "quantity": 1040,
        "price": 156.5,
        "tradeTime": "2025-12-08T16:55:58.971Z",
        "metadata": null
    }
]
```

<br/>

- Filter trades by account & ticker

```
GET http://localhost:3000/api/trades?accountId=ACC123&ticker=AAPL
```

```
[
    {
        "id": "2",
        "accountId": "ACC123",
        "ticker": "AAPL",
        "side": "BUY",
        "quantity": 100,
        "price": 150.5,
        "tradeTime": "2025-12-09T19:30:42.167Z",
        "metadata": null
    },
    {
        "id": "3",
        "accountId": "ACC123",
        "ticker": "AAPL",
        "side": "BUY",
        "quantity": 100,
        "price": 150.5,
        "tradeTime": "2025-12-09T19:30:43.993Z",
        "metadata": null
    }
]
```

<br/>

- Get all positions

```
GET http://localhost:3000/api/positions
```

```
[
    {
        "accountId": "ACC124",
        "ticker": "NVDA",
        "netQuantity": 1040,
        "averagePrice": 156.5,
        "grossNotional": 162760,
        "lastTradePrice": 156.5
    },
    {
        "accountId": "ACC123",
        "ticker": "AAPL",
        "netQuantity": 200,
        "averagePrice": 150.5,
        "grossNotional": 30100,
        "lastTradePrice": 150.5
    }
]
```

<br/>

- Get positions for one account

```
GET http://localhost:3000/api/positions/ACC123
```

```
[
    {
        "accountId": "ACC123",
        "ticker": "AAPL",
        "netQuantity": 200,
        "averagePrice": 150.5,
        "grossNotional": 30100,
        "lastTradePrice": 150.5
    }
]
```
