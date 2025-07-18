import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const CreateWorkspace = mutation({
  args: {
    messages: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      messages: args.messages,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: { workspaceId: v.id("workspace") },
  handler: async (ctx, { workspaceId }) => {
    const workspace = await ctx.db.get(workspaceId);
    return workspace;
  },
});

export const UpdateMessages = mutation({
  args: {
    workspaceId: v.id("workspace"),
    messages: v.any(),
  },
  handler: async (ctx, args) => {
    const workspace = await ctx.db.patch(args.workspaceId, {
      messages: args.messages,
    });
    return workspace;
  },
});
export const UpdateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.workspaceId, {
      fileData: args.files,
    });
    return result;
  },
});

export const GetAllWorkspaces = query({
  args: { userId: v.id("users") },

  handler: async (ctx, args) => {
    console.log("Fetching all workspaces for user:", args.userId);
    const workspaces = await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();
    return workspaces;
  },
});
