const today = new Date();
const yesterday = new Date();

yesterday.setDate(yesterday.getDate() - 1);

const posts = [
  {
    id: '1234abcd',
    published: today,
    updated: [yesterday],
    title: 'test post 1',
    markdown: '#test post 1',
    markup: '<h1>test post 1</h1>',
    summary: 'test summary 1',
    tags: ['test tag 1', 'test tag 2'],
    keywords: ['test keyword 1', 'test keyword 2'],
    slug: 'test-post-one',
    cover: 'image-id-123',
    metadata: {
      random: true,
      piece: 133,
      of: [],
      data: {},
    },
  },
  {
    id: 'dcba4321',
    published: yesterday,
    title: 'minimal data',
    markdown: 'minimal',
  },
];

export default posts;
