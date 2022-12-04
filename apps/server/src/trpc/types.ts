import { AuthorizedContext, Context } from ".";

export type PublicService<Input, Output> = (data: {
  input: Input;
  ctx: Context;
}) => Output;

export type AuthorizedService<Input, Output> = (data: {
  input: Input;
  ctx: AuthorizedContext;
}) => Output;
