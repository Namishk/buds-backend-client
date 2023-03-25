import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { platformType } from "~/types/projectTypes";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const projectRoute = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({ platform: z.string(), authType: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.session.user;
      const { platform, authType } = input;
      if (!platform || !authType) throw new TRPCError({ code: "BAD_REQUEST" });

      const project = await ctx.prisma.projects.upsert({
        create: {},
      });
    }),
});
