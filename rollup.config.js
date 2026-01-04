// Babelのプラグインをインポートする
import babel from '@rollup/plugin-babel' ;

// package.jsonの情報をオブジェクトとして取得する。Node.js v20あたりを想定。
// もしここでエラーが出る場合は、その下のコードに変更
import packageInfo from './package.json' assert { type: 'json' } ; // v18-21
// import packageInfo from './package.json' with { type: 'json' } ; // v22-

// 生成されたコードを後から置換する、したたか企画製処理集をインポートする。
// 開発作業やExtendScript実行結果を改善させるものだが、必須ではない
import {
  tripleQuoteReplace,
  consoleReplace,
  avoidMemoryLeak,
} from './rollup-plugin-sttk3-replace.js' ;

// 設定本体
export default {
  // メイン(始点・エントリーポイント)のJavaScript
  input: 'src/index.js',

  // JavaScript書き出し設定
  output: {
    // 書き出し先。package.jsonのnameを流用する設定にしてある
    file: `dist/${packageInfo.name}.jsx`,

    // 単体で実行可能なJavaScript (即時関数)に変換する設定にしてある。
    // (function() {...})(); のような形式で出力される
    format: 'iife',

    // 本番用書き出しではセキュリティを考慮してfalseにするのが一般的
    sourcemap: false,

    /*
       できるjsxファイルの先頭につけるコメント。
       targetengineなどExtendScriptのPreprocessor directiveは
       ソースコードから消えるので、指定するならここで書く必要がある
    */
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
  
  // プラグイン処理設定
  plugins: [
    // rollup-plugin-sttk3-replace.jsに由来する、生成されたコードへの後処理。
    // このプラグイン処理を実行する
    tripleQuoteReplace(),
    consoleReplace(),
    avoidMemoryLeak(),

    // Babelの設定
    babel({
      babelHelpers: 'bundled',

      // 同梱するJavaScriptパターン
      extensions: ['.js'],
      include: ['src/**/*'],

      // 同梱しないJavaScriptパターン
      exclude: 'node_modules/**',

      // 変換プリセットをInternet Explorer 8にすることで、間接的にECMAScriptバージョン(ES3)を指定する
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
