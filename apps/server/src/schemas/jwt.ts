import { z } from "zod";

export const jwtSchema = z.string().cuid();
