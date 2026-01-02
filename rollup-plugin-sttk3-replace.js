/**
  * ExtendScriptの'''および"""を`バッククォートに置換する。
  * ExtendScriptの複数行テキスト記述法で書いたときにコンパイルエラーが起こるのを防ぐ
*/
export function tripleQuoteReplace() {
  return {
    name: 'tripleQuoteReplace',
    transform(code) {
      // ''' """ → ` に置換（正規表現で終了側も対応などの丁寧なことはしない）
      const replacedCode = code.replace(/(?:'''|""")/g, '`') ;
      return {
        code: replacedCode,
        map: null,
      } ;
    }
  } ;
}

/**
  * console.logなどを$.writelnにする。
  * ExtendScript実行時のエラーを防ぐ
*/
export function consoleReplace() {
  return {
    name: 'consoleReplace',
    renderChunk(code) {
      const replacedCode = code.replace(/console\.(?:error|worn|log)\(/g, '$.writeln(') ;
      return {
        code: replacedCode,
        map: null,
      } ;
    }
  } ;
}

/**
  * 最終的にfunction内functionをnullにする。
  * Illustratorはかつてfunction内functionが消えずに残り続けて不具合につながることがあったので、それを防ぐための機能
*/
export function avoidMemoryLeak() {
   return {
    name: 'avoidMemoryLeak',
    renderChunk(code) {
      const patternFunctonName = /^ {2,}function ([^\(]+)(?=\()/mg ;
      const matchList = Array.from(code.matchAll(patternFunctonName)) ;
      const functionNames = matchList.map((matchObj) => {
        return matchObj[1] ;
      }) ;

      const command = `${functionNames.join(' = ')} = null ;
$.gc() ;` ;
      const replacedCode = `${code}\n${command}\n` ;
      return {
        code: replacedCode,
        map: null,
      } ;
    }
  } ;
}
