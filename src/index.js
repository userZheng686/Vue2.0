import Vue from 'vue'

let vm = new Vue({
    el : "#app",
    data(){
        return {
            title : '学生列表',
            name : 'admin',
            classNum : 1,
            total : 2,
            teacher : ['张三','李四'],
            students : [
                {
                    id : 1,
                    name : '小红'
                },
                {
                    id : 2,
                    name : '小明'
                }
            ]
        }
    }
})

