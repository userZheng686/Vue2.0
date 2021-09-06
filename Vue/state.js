import {proxyData} from './proxy'
import {observe} from './observe.js'

function initState(vm){
    let options = vm.$options

    if(options.data){
        initData(vm)
    }
}

function initData(vm){
    let data = vm.$options.data
    vm._data = data = typeof data === 'function' ? data.call(vm) : data || {}
    for(let key in data){
        proxyData(vm,'_data',key)
    }

    observe(vm._data)
}

export {
    initState
}