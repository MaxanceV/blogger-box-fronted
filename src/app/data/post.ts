import { Category } from "./category";

export interface Post {
    id: string;
    title: string;
    content: string;
    createdDate: Date | string;
    category: Category;
}

export interface PostRequest extends Omit<Post, 'id' | 'createdDate' | 'category'> {
    categoryUuid: string;
  }