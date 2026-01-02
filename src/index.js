import { doSomething } from './external.js' ;

(function() {
  doSomething() ;

  const inlineVariable = 'テンプレートリテラル展開' ;
  alert(`複数行のテキスト
${inlineVariable}も可能`) ;
})() ;
