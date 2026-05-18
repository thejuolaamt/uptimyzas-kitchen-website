import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BlogComments from "./BlogComments";

const SITE_URL = "https://www.uptimyzaskitchen.com";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url: string | null;
  created_at: string;
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, content, excerpt, image_url, created_at")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Uptimyzas Kitchen`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <article className="pt-24 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <p className="text-[#666666] text-sm mb-4">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2C2C2C] mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Featured image */}
          {post.image_url && (
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-[#2C2C2C] leading-relaxed
              prose-p:mb-6 prose-p:leading-relaxed
              prose-headings:text-[#2C2C2C] prose-headings:font-bold
              prose-a:text-[#8B1E1E] prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-2xl prose-img:my-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Comments */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto px-4">
          <BlogComments postId={post.id} />
        </div>
      </section>
    </>
  );
}