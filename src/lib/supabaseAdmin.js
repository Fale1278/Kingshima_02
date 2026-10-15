// Node.js Backend Admin Helper (Replacing Supabase Admin Client)
import * as db from './db.js';
import * as nodeAuth from './nodeAuth.js';

export function getSupabaseAdmin() {
  return {
    from: (table) => {
      if (table === 'students') {
        return {
          select: () => ({
            or: () => ({
              maybeSingle: async () => ({ data: null, error: null }),
            }),
            eq: () => ({
              maybeSingle: async () => ({ data: null, error: null }),
            }),
          }),
        };
      }
      return {};
    },
    db,
    nodeAuth,
  };
}
