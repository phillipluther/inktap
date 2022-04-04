# inktap-api

## Resources

- Posts
- _(Soon) Tags_
- _(Soon) Authors_
- _(Soon) Pages_ (Is this a thing? Just a post, right?)

## Managing Resources

| Route+Verb          | Description                                                                  | Required                                       | Options         |
| ------------------- | ---------------------------------------------------------------------------- | ---------------------------------------------- | --------------- |
| `GET /posts`        | Retrieve a listing of all posts from the content source, filtered by options | --                                             | `{ wip: true }` |
| `GET /posts/:id`    | Get all data about a single post from the content source                     | --                                             | --              |
| `POST /posts`       | Create a new post                                                            | See [`post` type](src/__types__/post.types.ts) | --              |
| `PUT /posts/:id`    | Update a single post with the given ID                                       | See [`post` type](src/__types__/post.types.ts) | --              |
| `DELETE /posts/:id` | Delete a post with the given ID                                              | --                                             | --              |

All other route and verb combos are not supported and will return a `401`.
