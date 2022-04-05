import { z } from 'zod';

export const Post = z.object({
  id: z.string(),
  published: z.date(),
  updated: z.array(z.date()).optional(),
  title: z.string(),
  markdown: z.string(),
  markup: z.string().optional(),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  slug: z.string().optional(),
  cover: z.string().optional(),
  metadata: z.object({}).catchall(z.any()).optional(),
});

export type Post = z.infer<typeof Post>;

/*

  id: string;
  published: Date;
  updated?: Date[];
  title: string;
  markdown: string;
  markup?: string;
  summary?: string;
  tags?: string[]; // <-- these are organizational units, VS.
  keywords?: string[]; // <-- these are content descriptors
  slug?: string;
  cover?: string;
  metadata?: {
    [key: string]: any;
  };

*/
