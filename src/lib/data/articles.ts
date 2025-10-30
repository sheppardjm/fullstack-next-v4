import db from "@/db";
import { Article, articles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";

export async function getArticles() {
  const res = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  return res;
}

export async function getArticleById(id: number) {
  const res = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));
  return res[0] ? res[0] : null;
}
