import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  isTFAEnabled: boolean,
  isOAuth: boolean
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}