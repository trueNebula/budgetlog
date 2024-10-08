import { middleware } from '../trpc.ts';
import { TRPCError } from '@trpc/server';

export const withAuth = middleware(async ({ ctx, next }) => {
  // console.log(ctx.session);
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
