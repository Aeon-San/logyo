import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/index.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
            sourcemap: true,
            exports: 'named'
        }
    ],
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            presets: [
                ['@babel/preset-env', {
                    targets: { node: '14' },
                    modules: false
                }]
            ]
        })
    ],
    external: [
        'chalk',
        'fs',
        'path',
        'process'
    ]
};