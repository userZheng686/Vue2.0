import {pareseHTMLToAst} from './astParser'
import {generate} from './generate'

function compileRenderFunction(html){
    const ast = pareseHTMLToAst(html),
          code = generate(ast),
          render = new Function(`
            with(this){return ${code}}
          `)
    console.log(render)
    return render
}

export {
    compileRenderFunction
}