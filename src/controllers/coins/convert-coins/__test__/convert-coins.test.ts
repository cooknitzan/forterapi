import request from "supertest";
import { app } from "../../../../app";

it("response wtih the coins after convert and status of 200 when given valid coins in capital and small letters", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=btc,Doge&convertFrom=eth,USd")
    .send()
    .expect(200);
  const body = response.body;
  let bool = body.length == 2;
  body.forEach((key: object) => {
    const objKey = Object.entries(key);
    if (Object.keys(objKey[0][1]).length != 2) {
      bool = false;
    }
  });
  expect(bool).toBe(true);
});

it("response with only valid coins after convert and status of 200 when given valid coins and fake coins", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=btc,doge,Daer&convertFrom=eth,USd,aser")
    .send()
    .expect(200);
  const body = response.body;
  let bool = body.length == 2;
  body.forEach((key: object) => {
    const objKey = Object.entries(key);
    if (Object.keys(objKey[0][1]).length != 2) {
      bool = false;
    }
  });
  expect(bool).toBe(true);
});

it("response with an error and status of 400 when given only fake coins", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=dsf&convertFrom=asdf")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("please provide valid coins");
});

it("response with an error and status of 400 when given fake convertTo coins", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=dsf&convertFrom=btc")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("please provide valid coins");
});

it("response with an error and status of 400 when given fake convertFrom coins", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=btc&convertFrom=asdf")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual("please provide valid coins");
});

it("response with an error and status of 400 when convertTo is not given", async () => {
  const response = await request(app)
    .get("/api/coins?convertFrom=btc")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual(
    "please provide convertTo coins"
  );
});

it("response with an error and status of 400 when convertFrom is not given", async () => {
  const response = await request(app)
    .get("/api/coins?convertTo=btc")
    .send()
    .expect(400);
  expect(response.body.errors[0].message).toEqual(
    "please provide convertFrom coins"
  );
});
