import type { Post } from "~/models/post.server";
import { getPost, getPosts } from "~/models/post.server";
import { json } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Link, useLoaderData } from "@remix-run/react";

// type LoaderData = { posts?: Post };

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  // invariant(params.id, "id is required");
  const posts = await getPosts();

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return json<LoaderData>({ posts });
};

function Latest() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <>
      <div>Latest</div>
      <main>
        <ul>
          {posts.map((post: Post) => (
            <li key={post.id}>
              <Link
                to={post.id}
                prefetch="intent"
                className="text-blue-600 underline"
              >
                {`PostId ${post.id}`}
                <br></br>
                {`PostTitle ${post.title}`}
                <br></br>
                {`PostBody ${post.body}`}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default Latest;
