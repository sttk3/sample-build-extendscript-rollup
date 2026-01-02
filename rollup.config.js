import babel from '@rollup/plugin-babel' ;
import packageInfo from './package.json' assert { type: 'json' } ;

// 生成されたコードへの後処理集
import {
  tripleQuoteReplace,
  consoleReplace,
  avoidMemoryLeak,
} from './rollup-plugin-sttk3-replace.js' ;

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${packageInfo.name}.jsx`,
    format: 'iife',
    sourcemap: false,

    // jsxファイルの先頭につけるコメント
    banner: `/**
  * @file ファイル説明
  * @version ${packageInfo.version}
  * @author 作者名
  * @copyright © 2026 example.com
*/

//@target 'illustrator'
//@targetengine 'エンジン名'
`
  },
  
  plugins: [
    // 生成されたコードへの後処理
    tripleQuoteReplace(),
    consoleReplace(),
    avoidMemoryLeak(),

    babel({
      babelHelpers: 'bundled',
      extensions: ['.js'],
      include: ['src/**/*'],
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {ie: '8'},
            modules: false,
            loose: true,
          },
        ],
      ]
    })
  ]
} ;
