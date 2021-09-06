const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g

function formatProps(attrs){
    let attrStr = ''
    for(let i=0;i<attrs.length;i++){
        let attr = attrs[i]

        if(attr.name === 'style'){
            let styleAttrs = {}
            attr.value.split(';').map((styleArr) => {
                let [key,value] = styleArr.split(':')
                styleAttrs[key] = value
            })
            attr.value = styleAttrs
        }

        attrStr += `${attr.name}:${JSON.stringify(attr.value)},`
    }
    
    return `{${attrStr.slice(0,-1)}}`
}

function getChildren(el){
    const children = el.children

    if(children){
        return children.map(c => generateChild(c)).join(',')
    }
}

function generateChild(node){
    if(node.type === 1){
        return generate(node)
    }else if(node.type === 3){
        let text = node.text;
        if(!defaultTagRE.test(text)){
            return `_v(${JSON.stringify(text)})`
        }
        let match,index,
            lastIndex = defaultTagRE.lastIndex = 0,
            textArr = []
        while(match = defaultTagRE.exec(text)){
            index = match.index
            if(index > lastIndex){
                textArr.push(JSON.stringify(text.slice(lastIndex,index)))
            }
            textArr.push(`_s(${match[1].trim()})`)
            lastIndex = index + match[0].length
        }

        if(lastIndex < text.length){
            textArr.push(JSON.stringify(text.slice(lastIndex,)))
        }
        return `_v(${textArr.join('+')})`
    }   
}

function generate(el){
    let children  = getChildren(el)
    let code = ` _c('${el.tag}', ${
        el.attrs.length > 0 
        ?
        `${formatProps(el.attrs)}`
        :
        'undefined'
      }${
        children ? `,${children}` : ''
      })
    `
    return code
}

export {
    generate
}