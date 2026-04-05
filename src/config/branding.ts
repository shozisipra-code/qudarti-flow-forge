// Global branding config — single source of truth
// Update hero image here for the 6-month refresh cycle

import heroImage from "@/assets/hero-login.jpg";
import logoIcon from "@/assets/qudarti-icon.png";

export const BRANDING = {
  appName: "QUDARTI",
  logoIcon,
  heroImage,
  copyright: "© 2023 Posive",
  termsLabel: "Terms & Conditions",
} as const;

// Demo credentials for prototype
export const DEMO_USERS = {
  super: { username: "admin", password: "admin123", role: "super" as const },
  lower: { username: "user", password: "user123", role: "lower" as const },
};

export type UserRole = "super" | "lower";

export interface AppUser {
  username: string;
  role: UserRole;
  permissions: string[];
}

export const ALL_MODULES = [
  "gate-inward",
  "goods-requisition",
  "daily-production",
  "finished-goods",
  "gate-outward",
  "production-order",
  "inventory",
] as const;

export type ModuleId = (typeof ALL_MODULES)[number];
