import {x} from './a.js'
import './a.css'
import './b.less'
require('@babel/polyfill')
var b= 1
b++
class A{
    c=1
}

function * gen(){
    yield 1;
}

console.log(gen().next())
console.log(11,A)

console.log(x,'-'+b)

'aaa'.includes('a')