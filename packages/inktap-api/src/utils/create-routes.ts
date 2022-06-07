import { Express, Router } from 'express';
import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import createControllers from './create-controllers';

export default async function (app: Express): Promise<Express | null> {
  try {
    const resourceDir = path.resolve('src/resources');
    const modelSuffix = '.model.ts';
    const modelFiles = fs
      .readdirSync(resourceDir)
      .filter((filename) => filename.includes(modelSuffix));

    for (const file of modelFiles) {
      const { default: model } = await import(path.join(resourceDir, file));
      const controllers = createControllers(model);
      const endpoint = `/${pluralize(file.replace(modelSuffix, ''))}`;
      const router = Router();

      console.log('[inktap-api]', `Creating CRUD routes for ${endpoint}`);

      router.route('/').post(controllers.createOne).get(controllers.getMany);
      router
        .route('/:id')
        .get(controllers.getOne)
        .put(controllers.updateOne)
        .patch(controllers.updateOne)
        .delete(controllers.deleteOne);

      app.use(endpoint, router);
    }

    return app;
  } catch (err) {
    console.error(err);
    return null;
  }
}
