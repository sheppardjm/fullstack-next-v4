import { eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import db from "@/db";
import { articles } from "@/db/schema";
import resend from "@/email";
import CelebrationTemplate from "@/email/templates/celebration-template";

const BASE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export default async function sendCelebrationEmail(
  articleId: number,
  pageviews: number,
) {
  const res = await db
    .select({
      email: usersSync.email,
      id: usersSync.id,
      title: articles.title,
      name: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .where(eq(articles.id, articleId));

  const { email, id, name, title } = res[0];

  if (!email) {
    throw new Error("Author email not found");
  }

  /* If custom domain is setup
    const emailRes = await resend.emails.send({
    from: "Wikimasters",
    to: email,
    subject: "Wikimasters Article Pageviews",
    html: `<h1>Congratulations!</h1><p>Your article has received ${pageviews} views.</p>`,
  }); */

  const emailRes = await resend.emails.send({
    from: "Wikimasters <onboarding@resend.dev>",
    to: "jamisonsheppard@gmail.com",
    subject: "Wikimasters Article Pageviews",
    react: CelebrationTemplate({
      name: name || undefined,
      articleTitle: title || undefined,
      articleUrl: `${BASE_URL}/wiki/${articleId}`,
      pageviews,
    }),
  });

  if (!emailRes.error) {
    console.log(
      `Celebration email sent to user ID ${id} for article ID ${articleId}`,
    );
  }
}
