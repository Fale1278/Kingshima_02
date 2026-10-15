// Kingshima Node.js Backend Compatibility Adapter (Replacing Supabase Client)
import { backendClient } from './backendClient';

export const supabase = {
  from: (tableName) => {
    return {
      select: () => ({
        eq: () => ({
          maybeSingle: async () => ({ data: null, error: null }),
          single: async () => ({ data: null, error: null }),
        }),
        order: () => Promise.resolve({ data: [], error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
        single: async () => ({ data: null, error: null }),
      }),
      insert: async (data) => {
        if (tableName === 'submissions') {
          try {
            const res = await backendClient.submitAssignment(data);
            return { data: res.submission, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        }
        return { data, error: null };
      },
      upsert: async (data) => {
        if (tableName === 'profiles') {
          try {
            const res = await backendClient.saveOnboarding(data.id, data);
            return { data: res.profile, error: null };
          } catch (err) {
            return { data: null, error: err };
          }
        }
        return { data, error: null };
      },
      update: () => ({
        eq: async (col, val) => {
          return { data: { id: val }, error: null };
        },
      }),
    };
  },

  auth: {
    signUp: async ({ email, password, options }) => {
      try {
        const res = await backendClient.register({
          email,
          username: options?.data?.full_name || email.split('@')[0],
          password,
        });
        const user = { id: res.student.id, email: res.student.email };
        return { data: { user, session: { access_token: res.token, user } }, error: null };
      } catch (err) {
        return { data: null, error: err };
      }
    },

    signInWithPassword: async ({ email, password }) => {
      try {
        const username = email.split('@')[0];
        const res = await backendClient.login({ email, username, password });
        const user = { id: res.student.id, email: res.student.email };
        return { data: { user, session: { access_token: res.token, user } }, error: null };
      } catch (err) {
        return { data: null, error: err };
      }
    },

    signInWithOAuth: async () => {
      // Node.js backend fallback for OAuth
      return { data: { provider: 'google', url: '/onboarding' }, error: null };
    },

    signOut: async () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bootcamp_student');
        localStorage.removeItem('bootcamp_token');
      }
      return { error: null };
    },

    getSession: async () => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('bootcamp_student');
        if (saved) {
          const student = JSON.parse(saved);
          return { data: { session: { user: student } }, error: null };
        }
      }
      return { data: { session: null }, error: null };
    },

    onAuthStateChange: () => ({
      data: { subscription: { unsubscribe: () => {} } },
    }),
  },

  storage: {
    from: () => ({
      upload: async () => Promise.resolve({ data: { path: 'local_upload' }, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};
