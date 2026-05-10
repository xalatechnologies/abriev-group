export type UserRole = "buyer" | "seller" | "dealer" | "admin";

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  locale?: string;
  createdAt: string;
};
