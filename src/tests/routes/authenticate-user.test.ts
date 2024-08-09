import request from "supertest";
import bcrypt from "bcryptjs";

import app from "../../app";
import { UserRepo } from "../../repos/user-repo";

jest.mock("../../repos/user-repo");

describe("Authenticate user routes", () => {
  describe("Signup user", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    test("Signup", async () => {
      const mockFindUser = jest.fn().mockResolvedValue(null);
      const mockCreateUser = jest.fn().mockResolvedValue({
        id: "1",
        username: "testuser",
      });
      UserRepo.findByUsername = mockFindUser;
      UserRepo.create = mockCreateUser;
      const res = await request(app()).post("/auth/signup").send({
        username: "testuser",
        password: "testpassword",
      });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        id: "1",
        username: "testuser",
      });
    });

    test("Signup with username already exist", async () => {
      const mockFindUser = jest.fn().mockResolvedValue({
        id: "2",
        username: "testuser",
      });
      UserRepo.findByUsername = mockFindUser;
      const res = await request(app()).post("/auth/signup").send({
        username: "testuser",
        password: "testpassword",
      });

      expect(UserRepo.create).not.toHaveBeenCalled();
      expect(res.status).toEqual(500);
    });
  });

  describe("Signin user", () => {
    let password: string;
    let pass: string;

    beforeEach(() => {
      password = "test123";
      pass = bcrypt.hashSync(password);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("Signin", async () => {
      const mockFindUser = jest.fn().mockResolvedValue({
        id: "1",
        username: "testuser",
        password: pass,
      });
      UserRepo.findByUsername = mockFindUser;

      const res = await request(app()).post("/auth/signin").send({
        username: "testuser",
        password,
      });

      expect(res.status).toBe(200);
    });

    test("Signin with wrong password", async () => {
      const mockFindUser = jest.fn().mockResolvedValue({
        id: "1",
        username: "testuser",
        password: "wrongpassword",
      });
      UserRepo.findByUsername = mockFindUser;

      const res = await request(app()).post("/auth/signin").send({
        username: "testuser",
        password: pass,
      });

      expect(res.status).toBe(400);
      expect(res.body).toStrictEqual({ message: "Incorect password" });
    });

    test("Signin user does not exist", async () => {
      const mockFindUser = jest.fn().mockResolvedValue(null);
      UserRepo.findByUsername = mockFindUser;

      const res = await request(app()).post("/auth/signin").send({
        username: "testuser",
        password: pass,
      });

      expect(res.status).toBe(404);
      expect(res.body).toStrictEqual({ message: "User does not exist" });
    });
  });
});
