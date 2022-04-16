/**
 * don't forget to index your utils!
 */
import { readdirSync } from 'fs';
import path from 'path';
import camelcase from 'camelcase';
import * as utils from '@src/utils';

describe('utils/index', () => {
  const dir = path.resolve('src/utils');
  const utilFiles = readdirSync(dir).filter((f) => {
    const isFile = /\.ts$/.test(f);
    const isIndex = /index/.test(f);

    return isFile && !isIndex;
  });

  test('provides a named export for each utility function', () => {
    utilFiles.forEach((file) => {
      const functionName = camelcase(path.parse(file).name);
      const util = (utils as { [key: string]: any })[functionName];

      expect(util).toBeDefined();
    });
  });

  test('utils and indexing should balance', () => {
    expect(Object.keys(utils).length).toEqual(utilFiles.length);
  });
});
