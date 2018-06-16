import nodeResolve from 'rollup-plugin-node-resolve'
import {uglify} from 'rollup-plugin-uglify'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'tmpBuild/main-aot.js',
  output: {
    file: 'build.gen.js', // output a single application bundle
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    nodeResolve({jsnext: true}),
    uglify({}),
    filesize()
  ]
}
