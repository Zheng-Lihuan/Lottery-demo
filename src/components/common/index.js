import TodoList from './TodoList'
import TodoItem from './TodoItem'

function plugins(Vue) {  
  Vue.component('todo-list',TodoList)
  Vue.component('todo-item',TodoItem)
}

export default plugins