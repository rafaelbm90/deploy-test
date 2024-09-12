import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { deletePost } from "~/models/post.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const data = params;
  return json({ data });
};

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  invariant(typeof params.id === "string", "id is required");

  if (intent === "delete") {
    await deletePost(params.id);
    return redirect("/latest");
  }

  return null;
};

function PostRoute() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Form method="POST" key={data.id}>
      <div className="flex flex-center padding">
        <div>PostRoute {data.id}</div>
      </div>
      <div className="flex flex-center margin-t2">
        <div className="">
          <button
            className="submit-btn text-white bold bkgd-green rounded padding margin-r"
            type="submit"
            name="intent"
            value="update"
          >
            Update
          </button>
        </div>
        <button
          className="submit-btn text-white bold bkgd-red rounded padding margin-l"
          type="submit"
          name="intent"
          value="delete"
        >
          Delete
        </button>
      </div>
    </Form>
  );
}

export default PostRoute;
