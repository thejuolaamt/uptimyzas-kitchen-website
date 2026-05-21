import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, updates, and what's cooking at Uptimyzas Kitchen. Right here in Ondo.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "Blog | Uptimyzas Kitchen",
    description: "Stories from the kitchen.",
  },
};

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string | null;
  created_at: string;
}

async function getPosts(): Promise<BlogPost[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, image_url, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .abortSignal(controller.signal);

    clearTimeout(timeout);
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <section className="pt-24 pb-12 bg-[#F9F9F9]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-3">
            Stories from the kitchen
          </h1>
          <p className="text-[#666666] text-lg max-w-xl mx-auto">
            What's cooking, what's new, and a few words from us.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-[#666666] text-lg">No posts yet. Check back soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="relative h-52 overflow-hidden rounded-2xl mb-4 bg-[#F9F9F9]">
                    {post.image_url ? (
                      <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl text-[#8B1E1E] opacity-20">🍛</span>
                      </div>
                    )}
                  </div>
                  <p className="text-[#666666] text-xs mb-2">
                    {new Date(post.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-bold text-[#2C2C2C] mb-2 group-hover:text-[#8B1E1E] transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-[#666666] text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}