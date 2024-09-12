import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";
import { json } from "@remix-run/node";

// type LoaderData = {
//   posts: Awaited<ReturnType<typeof getPostsListings>>;
// };

export const meta: MetaFunction = () => {
  return [
    { title: "Steam Blog" },
    { name: "description", content: "Welcome to Steam Blog!" },
  ];
};

export const loader: LoaderFunction = async () => {
  const posts = await db.post.findMany();
  return json({ posts });
};

export default function Index() {
  const posts = useLoaderData();
  return (
    <div>
      <div className="home-hero-parent">
        <div className="home-hero home-hero-grid1">
          <div className="home-hero-left"></div>
          <div className="home-hero-grid2">
            <div className="home-hero-top-right"></div>
            <div className="home-hero-bottom-right"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
