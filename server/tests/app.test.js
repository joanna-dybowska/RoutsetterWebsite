const request = require("supertest");
const app = require("../src/app");

test("Testing getting 'Hello World!' message", async () => {
  const response = await request(app).get("/hello-world").expect(200);
  expect(response.body.msg).toBe("Hello World!");
});

test("Testing uploading wall image", async () => {
  const response = await request(app).post("/wall-image").expect(200);
  expect(response.body.msg).toBe("File uploaded to 'wall-images'");
});
