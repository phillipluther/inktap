export type Post = {
  id: string;
  published: Date;
  updated?: Date[];
  title: string;
  summary?: string;
  tags?: string[]; // <-- these are organizational units, VS.
  keywords?: string[]; // <-- these are content descriptors
  markup: string;
  markdown: string;
  slug?: string;
  cover?: string;
  metadata?: {
    [key: string]: any;
  };
};
