import type { Post } from "~/models/post.server";
import { getPost, getPosts } from "~/models/post.server";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";

// type LoaderData = { posts?: Post };

export const loader: LoaderFunction = async ({ request, params }) => {
  // invariant(params.id, "id is required");
  const posts = await getPosts();

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ posts });
};

export const action: ActionFunction = async ({ request, params }) => {};

function Latest() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <main className="flex flex-center">
        <ul className="w-500 margin-t3">
          {posts.map((post: Post) => (
            <Link
              to={`/posts/${post.id}`}
              className="text-black text-no-decoration"
            >
              <li
                className="border rounded padding margin-t2 li-no-decoration hover-effect"
                key={post.id}
              >
                <h1 className="flex flex-center text-title padding">
                  {post.title}
                </h1>
                <div className="grid grid-columns11">
                  <div className="flex flex-center w-300 h-100">
                    <img
                      className="img-cover margin-r"
                      src="/public/favicon.ico"
                    ></img>
                  </div>
                  <h2 className="text-gray text-lg margin-l">{post.body}</h2>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Latest;
