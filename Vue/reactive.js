import {observe} from './observe'

function defineReactiveData(data,key,value){
    observe(value)
    Object.defineProperty(data,key,{
        get(){
            console.log('响应式读取',value)
            return value
        },
        set(newVal){
            console.log('响应式设置')
            if(value === newVal) return
            observe(newVal)
            value = newVal
        }
    })
}


export {
    defineReactiveData
}