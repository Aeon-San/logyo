import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named'
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        commonjs(),
        babel({
            babelHelpers: 'bundled',
            exclude: 'node_modules/**',
            envName: 'cjs', // This tells Babel to use the 'cjs' environment config
            presets: [
                ['@babel/preset-env', {
                    targets: { node: '14' },
                    modules: false // Keeping modules as ES6 for Rollup
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