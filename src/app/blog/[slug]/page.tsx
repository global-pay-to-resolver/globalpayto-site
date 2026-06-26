import Link from "next/link";
import { notFound } from "next/navigation";

import { BackButton } from "@/components/navigation/back-button";
import { blogPosts, getBlogPost } from "@/lib/blog-posts";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#151713]">
      <BackButton fallbackHref="/blog" maxWidth="48rem" />
      <article className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
        <Link
          className="text-sm font-semibold text-[#176b46] underline-offset-4 hover:underline"
          href="/blog"
        >
          Blog
        </Link>
        <p className="mt-8 text-xs font-semibold uppercase tracking-normal text-[#245c8d]">
          {post.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-base leading-7 text-[#586250]">
          {post.description}
        </p>
        <p className="mt-4 text-xs font-medium text-[#6d7668]">
          {post.publishedAt} · {post.readingMinutes} min read
        </p>

        <div className="mt-10 grid gap-6">
          {post.body.map((block, index) => {
            if (block.type === "heading") {
              return (
                <h2
                  className="pt-4 text-2xl font-semibold leading-snug text-[#151713]"
                  key={index}
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  className="grid list-disc gap-2 pl-5 text-base leading-7 text-[#3f493a]"
                  key={index}
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.type === "code") {
              return (
                <pre
                  className="overflow-x-auto rounded-lg border border-[#d9dfd1] bg-[#111611] p-4 text-sm leading-6 text-[#eef5e8]"
                  key={index}
                >
                  <code>{block.code}</code>
                </pre>
              );
            }

            return (
              <p className="text-base leading-7 text-[#3f493a]" key={index}>
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </main>
  );
}
