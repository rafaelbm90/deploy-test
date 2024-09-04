import { Post } from "@prisma/client/wasm";
import { db } from "~/db.server";

export type { Post };

export async function getUsers() {
  return db.user.findMany();
}

export async function getPosts() {
  return db.post.findMany();
}

export async function getPostListings() {
  return db.post.findMany({
    select: {
      id: true,
      title: true,
    },
  });
}

export async function getPost(id: string) {
  return db.post.findUnique({ where: { id } });
}

export async function createPost(post: Pick<Post, "id" | "title" | "body">) {
  return db.post.create({ data: post });
}

export async function updatePost(
  id: string,
  post: Pick<Post, "id" | "title" | "body">
) {
  return db.post.update({ data: post, where: { id } });
}

export async function deletePost(id: string) {
  return db.post.delete({ where: { id } });
}
