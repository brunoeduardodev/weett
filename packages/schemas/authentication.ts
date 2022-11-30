import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  image: z.string().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const getUserSchema = z.object({
  id: z.string().cuid(),
});

export type GetUserInput = z.infer<typeof getUserSchema>;

export const getUserByEmailSchema = z.object({
  email: z.string().email(),
});

export type GetUserByEmailInput = z.infer<typeof getUserSchema>;

export const getUserByAccountSchema = z.object({
  provider_providerAccountId: z.object({
    provider: z.string(),
    providerAccountId: z.string(),
  }),
});

export type GetUserByAccountInput = z.infer<typeof getUserByAccountSchema>;

export const updateUserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().optional(),
});

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export const deleteUserSchema = z.object({
  id: z.string().cuid(),
});

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;

export const linkAccountSchema = z.object({
  userId: z.string().cuid(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.string(),
});

export type LinkAccountInput = z.infer<typeof linkAccountSchema>;

export const unlinkAccountSchema = z.object({
  provider_providerAccountId: z.object({
    provider: z.string(),
    providerAccountId: z.string(),
  }),
});

export type UnlinkAccountInput = z.infer<typeof unlinkAccountSchema>;

export const getSessionAndUserSchema = z.object({
  sessionToken: z.string(),
});

export type GetSessionAndUserInput = z.infer<typeof getSessionAndUserSchema>;

export const createSessionSchema = z.object({
  sessionToken: z.string(),
  userId: z.string().cuid(),
  expires: z.date(),
});

export type CreateSessionInput = z.infer<typeof createSessionSchema>;

export const updateSessionSchema = z.object({
  sessionToken: z.string(),
  expires: z.date(),
});

export type UpdateSessionInput = z.infer<typeof updateSessionSchema>;

export const deleteSessionSchema = z.object({
  sessionToken: z.string(),
});

export type DeleteSessionInput = z.infer<typeof deleteSessionSchema>;
