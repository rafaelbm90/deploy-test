import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost, getPosts, updatePost } from "~/models/post.server";
import { Post } from "~/models/post.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const posts = await getPosts();

  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ posts });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  // const intent = formData.get("intent");

  const title = formData.get("title");
  const id = formData.get("id");
  const body = formData.get("body");

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof id === "string", "id must be a string");
  invariant(typeof body === "string", "body must be a string");

  // if (params.id === "new") {
  // await createPost({ title, id, body });
  await createPost({ title, id, body });
  // } else {
  //   await updatePost(params.id, { title, id, body });
  // }

  return redirect("/latest");
};

interface PostData {
  post?: {
    id?: string;
    title?: string;
    body?: string;
  };
}

function Title({ data }: { data: PostData }) {
  return (
    <Form method="post" key={data.post?.id ?? "new"}>
      <div className="flex flex-center padding">
        <label className="w-100">Post Title: </label>
        <input
          className="w-300 border rounded"
          type="text"
          name="title"
          defaultValue={data.post?.title}
        />
      </div>
    </Form>
  );
}

function NewPostRoute() {
  const data = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  const isCreating = navigation.formData?.get("intent") === "create";
  const isUpdating = navigation.formData?.get("intent") === "update";
  const isDeleting = navigation.formData?.get("intent") === "delete";

  const isNewPost = !data.post;

  return (
    <Form method="post" key={data.post?.id ?? "new"}>
      <Title data={data} />

      <div className="flex flex-center padding">
        <label className="w-100">Post ID: </label>
        <input
          className="w-300 border rounded"
          type="text"
          name="id"
          defaultValue={data.post?.id}
        />
      </div>
      <div className="flex flex-center padding ">
        <label className="w-100">Body: </label>
        <textarea
          className="w-300 h-300 border rounded no-resize"
          // id="body"
          name="body"
          defaultValue={data.post?.body}
        />
      </div>
      <div className="flex flex-center margin-t">
        {isNewPost ? null : (
          <button
            className="submit-btn text-white bkgd-red"
            type="submit"
            name="intent"
            value="delete"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          className="submit-btn text-white bold bkgd-green rounded padding"
          type="submit"
          name="intent"
          value={isNewPost ? "create" : "update"}
          disabled={isCreating || isUpdating}
        >
          {isNewPost ? (isCreating ? "Creating..." : "Create Post") : null}
          {isNewPost ? null : isUpdating ? "Updating..." : "Update"}
        </button>
      </div>
    </Form>
  );
}

export default NewPostRoute;
