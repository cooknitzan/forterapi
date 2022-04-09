import request from "supertest";
import { app } from "../../../../app";

it("response wtih the coins value and status of 200 when given valid coins in capital and small letters", async () => {
  const response = await request(app)
    .get("/api/coins/btc,eth,bnb,ETH,OPS,DOGE")
    .send()
    .expect(200);
  const body = Object.keys(response.body);
  expect(body).toHaveLength(5);
});

it("response with the coins value only ones and status code of 200 when given same coins few times", async () => {
  const response = await request(app)
    .get("/api/coins/btc,eth,bnB,ETH,OPS,ops,eth,BNB,eth,btc,dOGE")
    .send()
    .expect(200);
  const body = Object.keys(response.body);
  expect(body).toHaveLength(5);
});

it("response with only valid coins value and status of 200 when given valid coins and fake coins", async () => {
  const response = await request(app)
    .get("/api/coins/btc,dld,f4d,ops,eth,bnb,doge")
    .send()
    .expect(200);
  const body = Object.keys(response.body);
  expect(body).toHaveLength(5);
});

it("response with an error and status of 400 when given only fake coins", async () => {
  const response = await request(app)
    .get("/api/coins/asdasd")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("please provide valid coins");
});
