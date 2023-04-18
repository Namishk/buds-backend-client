import { TRPCError } from "@trpc/server";
import { z } from "zod";
// import { AuthType, platformType } from "~/types/projectTypes";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { AuthType, Prisma, platform } from "@prisma/client";

const zodPlatformType = z.enum([platform.GO, platform.Node]);
const zodAuthType = z.enum([AuthType.JWT, AuthType.Session]);

export const projectRoute = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        platform: zodPlatformType,
        authType: zodAuthType,
        database: z.string(),
        title: z.string(),
        Schema: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.session.user;
      const { platform, authType, database, title, Schema } = input;
      if (!platform || !authType || !database || !title || !Schema)
        throw new TRPCError({ code: "BAD_REQUEST" });
      return await ctx.prisma.projects.create({
        data: {
          platform: platform,
          AuthType: authType,
          Database: database,
          title: title,
          userId: id,
          Schema: Schema,
          updatedAt: new Date(),
        },
      });
    }),

  getProject: protectedProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { id } = ctx.session.user;
      const project = await ctx.prisma.projects.findUnique({
        where: {
          id: input,
        },
      });
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });
      if (project.userId !== id) throw new TRPCError({ code: "FORBIDDEN" });
      return project;
    }),

  getUserProjects: protectedProcedure.query(async ({ ctx }) => {
    const { id } = ctx.session.user;
    return await ctx.prisma.projects.findMany({
      where: {
        userId: id,
      },
    });
  }),

  updateSchema: protectedProcedure
    .input(
      z.object({
        ProjectID: z.string(),
        Schema: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.session.user;
      const { ProjectID, Schema } = input;
      const project = await ctx.prisma.projects.findUnique({
        where: {
          id: ProjectID,
        },
      });
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });
      if (project.userId !== id) throw new TRPCError({ code: "FORBIDDEN" });
      return await ctx.prisma.projects.update({
        where: {
          id: ProjectID,
        },
        data: {
          Schema: Schema,
        },
      });
    }),
});
