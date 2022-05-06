import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext',
        },
        include: ['src/**/*'],
        exclude: ['node_modules', '**/*.spec.ts'],
      },
    }),
    terser(),
  ],
};
