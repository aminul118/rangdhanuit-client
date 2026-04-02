import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { getBlogs } from "@/services/Blog/blogs";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  featuredImage: string;
  createdAt: string;
}

const RecentBlogsSidebar = async () => {
  const data = (await getBlogs({
    sort: "-createdAt",
    limit: "4",
    status: "PUBLISHED",
  })) as {
    success: boolean;
    data: Blog[];
  };
  const blogs = data.success ? data.data : [];

  return (
    <aside className="space-y-8 sticky top-28">
      <div>
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          Recent Articles
          <span className="h-1 w-12 bg-indigo-500 rounded-full" />
        </h3>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group flex gap-4 items-start"
            >
              <div className="relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border border-border/50">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-sm line-clamp-2 leading-tight group-hover:text-indigo-400 transition-colors">
                  {blog.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock size={12} className="text-indigo-400" />
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="p-1 rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className="p-8 rounded-[15px] bg-background space-y-4">
          <h3 className="text-2xl font-black leading-tight">
            Want to build <br />
            something <span className="text-indigo-400">epic</span>?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Let&apos;s turn your ideas into high-performance digital solutions.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-indigo-400 font-bold group"
          >
            Contact Now
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RecentBlogsSidebar;
