import request from "supertest";
import { app } from "../../app";

it("response with an error and status of 404 when given bad ep", async () => {
  const response = await request(app).get("/api/coinsasd/").send().expect(404);
  expect(response.body.errors[0].message).toEqual("Not Found");
});
