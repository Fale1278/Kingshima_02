import { verifyAdminRequest } from './nodeAuth';
import * as db from './db';

export function requireAdmin(req) {
  const isValid = verifyAdminRequest(req);
  if (!isValid) return null;
  return db;
}
