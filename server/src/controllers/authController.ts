import { NextFunction, Request, Response } from "express";
import User from "./../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../utils/appError";
import jwt from "jsonwebtoken";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return next(new AppError("User already existed", 400));

    const user = await User.create({ name, email, password, role });

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.status(201).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: { id: user.id, name, role },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password)
      return next(new AppError("Both Email and Password is required!", 400));

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("Invalid Email or Password provided!", 401));
    }
    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      // sameSite: "lax",
    });

    res.status(200).json({
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: { id: user.id, name: user.name, email:user.email, role: user.role },
      message: "Logged in successfully!"
    });
  }
);

export const refresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return next(new AppError("Refresh token is required", 400));
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string
    ) as any;

    const accessToken = generateAccessToken(payload.id, payload.role);
    // res.cookie("refreshToken", newRefreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   // sameSite: "lax",
    // });
    return res.json({ accessToken });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(new AppError("You're not logged in", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const currentUser = await User.findById(decoded.id).select('-password');

    if (!currentUser) return next(new AppError("User no longer exists", 401));
    req.user = currentUser;
    next();
  }
);

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
};
