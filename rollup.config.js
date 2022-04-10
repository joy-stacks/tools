import babel from 'rollup-plugin-babel'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/tools.js',
        format: 'umd',
        name: 'tools'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ]
}