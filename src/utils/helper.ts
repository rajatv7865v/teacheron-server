import * as crypto from 'crypto';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';


export function getNextDay() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
}

export function generateUUID(): string {
  return uuidv4();
}

export function generateOTP(length = 6) {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
}

import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'secret-for-otp'; // keep secure

export function generateOtpToken(userId: string, otp: string): string {
  const payload = {
    userId,
    otp,
    exp: Math.floor(Date.now() / 1000) + 60 * 5, // expires in 5 min
  };

  return jwt.sign(payload, JWT_SECRET);
}

export function verifyOtpToken(token: string, inputOtp: string): boolean {
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const { otp, userId } = decoded;

    return otp === inputOtp;
  } catch (err) {
    return false; // expired or invalid
  }
}

export function generateTransactionId(
  prefix: string = 'TXN',
  length: number = 40,
): string {
  const allowedChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  let randomPart = '';

  for (let i = 0; i < length - prefix.length - 1; i++) {
    // Reserve space for underscore
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    randomPart += allowedChars[randomIndex];
  }

  return `${prefix}_${randomPart}`;
}
