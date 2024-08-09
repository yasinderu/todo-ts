import { Request, Response, NextFunction } from "express";
import { authenticate, authorize } from "../../routes/auth";

describe("Auth middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  test("Without header", async () => {
    const expectedResponse = {
      message: "Unauthorized",
    };

    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
  });

  test('Without "Authorization" header', async () => {
    const expectedResponse = {
      message: "Unauthorized",
    };

    mockRequest = {
      headers: {},
    };

    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
  });

  test('With "Authorization" header', async () => {
    mockRequest = {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6IkpvaG4gRG9lIn0.NpiR1bKJmovOJFsC5P3oNTGPTI2q5PHB4fKCP7HoSqw",
      },
    };
    await authenticate(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });

  test("User Id does not match auth user id", async () => {
    mockRequest = {
      params: {
        userId: "2",
      },
      user: {
        id: "1",
        username: "John Doe",
      },
    };
    const expectedResponse = {
      message: "User is not authorized",
    };

    await authorize(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith(expectedResponse);
  });

  test("User Id match auth user id", async () => {
    mockRequest = {
      params: {
        userid: "1",
      },
      user: {
        id: "1",
        username: "User test",
      },
    };

    await authorize(
      mockRequest as Request,
      mockResponse as Response,
      mockNextFunction
    );

    expect(mockNextFunction).toHaveBeenCalled();
  });
});
