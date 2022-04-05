export interface Post {
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
}
