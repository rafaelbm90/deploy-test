import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { createPost, getPosts, updatePost } from "~/models/post.server";

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

function NewPostRoute() {
  const data = useLoaderData<typeof loader>();

  const navigation = useNavigation();
  // const isCreating = navigation.submission?.formData.get("intent") === "create";
  // const isUpdating = navigation.submission?.formData.get("intent") === "update";
  // const isDeleting = navigation.submission?.formData.get("intent") === "delete";

  const isCreating = navigation.state === "submitting";
  const isDeleting = navigation.state === "submitting";
  const isUpdating = navigation.state === "loading";
  const isNewPost = !data.post;

  return (
    <Form method="post" key={data.post?.id ?? "new"}>
      <div className="flex flex-center padding">
        <div className="w100 flex-start">
          <label>Post Title: </label>
        </div>
        <div className="new-post-form-box w300">
          <input type="text" name="title" defaultValue={data.post?.title} />
        </div>
      </div>
      <div className="flex flex-center padding">
        <div className="w100 flex-start">
          <label>Post ID: </label>
        </div>
        <div className="new-post-form-box w300">
          <input type="text" name="id" defaultValue={data.post?.id} />
        </div>
      </div>
      <div className="flex flex-center padding ">
        <div className="w100 flex-start">
          <label htmlFor="markdown">Body: </label>
        </div>
        <div className="new-post-form-box">
          <textarea
            id="body"
            rows={5}
            cols={40}
            name="body"
            defaultValue={data.post?.body}
          />
        </div>
      </div>
      <div className="flex flex-center">
        {isNewPost ? null : (
          <button
            className="submit-btn"
            type="submit"
            name="intent"
            value="delete"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          className="submit-btn text-white bold"
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
