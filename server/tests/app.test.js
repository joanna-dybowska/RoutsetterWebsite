const request = require("supertest");
const app = require("../src/app");

test("Testing getting 'Hello World!' message", async () => {
  const response = await request(app).get("/hello-world").expect(200);
  expect(response.body.msg).toBe("Hello World!");
});

test("Testing uploading wall image - correct case jpg", async () => {
  const response = await request(app)
    .post("/wall-image")
    .attach("image", "./tests/data/image-ok.jpg")
    .expect(200);
  expect(response.body.msg).toBe("File uploaded to 'wall-images'");
});

test("Testing uploading wall image - correct case png", async () => {
  const response = await request(app)
    .post("/wall-image")
    .attach("image", "./tests/data/image-ok.png")
    .expect(200);
  expect(response.body.msg).toBe("File uploaded to 'wall-images'");
});

test("Testing uploading wall image - image too large", async () => {
  const response = await request(app)
    .post("/wall-image")
    .attach("image", "./tests/data/image-too-large.jpg")
    .expect(400);
  expect(response.body.error).toBe("File too large");
});

test("Testing uploading wall image - not an image", async () => {
  const response = await request(app)
    .post("/wall-image")
    .attach("image", "./tests/data/not-an-image.pdf")
    .expect(400);
  expect(response.body.error).toBe("Please upload an image");
});
