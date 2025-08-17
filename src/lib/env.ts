export const env = {
  DB_URL: process.env.DATABASE_URL ?? "",
  CLERK_PUBLISHABLE: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "",
  CLERK_SECRET: process.env.CLERK_SECRET_KEY ?? "",
};

export const features = {
  db: Boolean(env.DB_URL),
  clerk: Boolean(env.CLERK_PUBLISHABLE && env.CLERK_SECRET),
  get both() {
    return this.db && this.clerk;
  },
};
