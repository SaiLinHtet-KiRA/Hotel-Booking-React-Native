import { z } from "zod";

export const LoginSchema = z.object({
  name: z.string({ error: "Name field is missing!!!" }),
  password: z
    .string({ error: "Password field is missing!!!" })
    .min(8, "Password must be at least 8 characters"),
});

type LoginType = z.infer<typeof LoginSchema>;

export default LoginType;
