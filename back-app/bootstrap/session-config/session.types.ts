declare module 'express-session' {
  interface SessionData {
    userId?: string;
    createdAt?: string;
  }
}
