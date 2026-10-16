// Client-Side API Helper for Kingshima Native In-House Backend

export const backendClient = {
  async register({ email, username, password }) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Registration failed');
    return data;
  },

  async login({ email, username, login_code, password }) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, login_code, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Login failed');
    return data;
  },

  async getMe(token) {
    const res = await fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Unauthorized');
    return data.student;
  },

  async getLesson(lessonId) {
    const res = await fetch(`/api/lessons/${encodeURIComponent(lessonId)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch lesson');
    return data.lesson;
  },

  async saveProgress(studentId, progress) {
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, progress }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save progress');
    return data;
  },

  async saveOnboarding(studentId, onboardingData) {
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, ...onboardingData }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to save onboarding');
    return data;
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploads', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'File upload failed');
    return data;
  },

  async submitAssignment(submissionData) {
    const res = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submissionData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit assignment');
    return data;
  },

  async claimCertificate(certData) {
    const res = await fetch('/api/certificates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(certData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to issue certificate');
    return data.certificate;
  },

  async verifyCertificate(certId) {
    const res = await fetch(`/api/certificates/${encodeURIComponent(certId)}`);
    const data = await res.json();
    if (!res.ok) {
      return { valid: false, message: data.message || data.error || 'Invalid certificate' };
    }
    return data;
  },

  async verifyPayment(reference, studentId) {
    const res = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference, studentId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to verify payment');
    return data;
  },
};
