import { initState } from "./state";
import {compileRenderFunction} from './compiler'
import { mountComponent } from "./lifecycle";

function initMixin(Vue){
    Vue.prototype._init = function(options){
        const vm = this
        vm.$options = options
        initState(vm)

        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function(el){
        const vm = this,
              options = vm.$options;

        el = document.querySelector(el)
        vm.$el = el

        if(!options.render){
            let template = options.template

            if(!template && el){
                template = el.outerHTML
            }

            const render = compileRenderFunction(template)
            options.render = render
        }

        mountComponent(vm)
    }
}

export {
    initMixin
}