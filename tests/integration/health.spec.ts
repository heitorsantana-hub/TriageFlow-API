import { describe, test, expect } from "@jest/globals";
import supertest from "supertest";
import {app} from "../../src/app";

const request = supertest(app);

describe("GET /health", () => {
    test("deve retorna status 200 e confirmar que a API está online", async () => {
      const respose = await request.get("/health");
      expect(respose.status).toBe(200);
      expect(respose.body).toEqual({status: "ok"});
    })
})