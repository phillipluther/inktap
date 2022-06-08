import { ZodError } from 'zod';
import { PostType } from '@src/resources/post.model';
import { TagType } from '@src/resources/tag.model';
import { UserType } from '@src/resources/user.model';

export { PostType as Post };
export { TagType as Tag };
export { UserType as User };

export type RequestData = {
  isValid: boolean;
  result?: SingleResource | ResourceCollection;
  error?: ZodError | string;
};

export type SingleResource = PostType | TagType | UserType;
export type ResourceCollection = SingleResource[];

export type Resource = 'tag' | 'post' | 'user';
export type Resources = 'tags' | 'posts' | 'user';

export type GenericObject = { [key: string]: unknown };

export type ResourceModel = {
  createOne: (data: SingleResource) => Promise<SingleResource>;
  getOne: (id: string) => Promise<SingleResource | null>;
  getMany: (params?: GenericObject) => Promise<ResourceCollection>;
  updateOne: (id: string, data: GenericObject) => Promise<SingleResource | null>;
  deleteOne: (id: string) => Promise<SingleResource | null>;
};
