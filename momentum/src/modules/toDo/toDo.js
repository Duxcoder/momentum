import customSelect from "../customSelect/customSelect";

const todoList = document.querySelector('.todo_list');
const ul = todoList.querySelector('ul');
const ToDo = () => {
    class Todo {
        constructor() {
            this.$todos = [];
            this.tab = 'Inbox';
            this.id = 0;
            this.edit = false
        }

        createTodo(todo) {
            let li = document.createElement('li');
            li.classList.add('li_todo')
            let todoItem = {
                text: todo,
                domItem: li,
                checked: false,
                tab: this.tab,
                id: this.id
            }
            li.innerHTML = `<input type="checkbox" name="${todoItem.id}" class="todo_input" />
            <div class="optionsTodo" data-options="${todoItem.id}">
            <div class="btn_options">
              <span></span>
            </div>
            <div class="wrapper_options">
              <ul class="todo_options_list">
                <li class="todo_option_item" data-option="edit">Edit</li>
                <li class="todo_option_item" data-option="moveInbox">Move to Inbox</li>
                <li class="todo_option_item" data-option="moveToday">Move to Today</li>
                <li class="todo_option_item" data-option="moveDone">Move to Done</li>
                <li class="todo_option_item" data-option="delete">Delete</li>
              </ul>
            </div>
          </div>
            <label for="${todoItem.id}" contenteditable="false">${todoItem.text}</label>`

            this.$todos.push(todoItem);
            this.id += 1;
        }
        addFromLocalStorage(todoItem) {

            let li = document.createElement('li');
            li.classList.add('li_todo')
            li.innerHTML = `<input type="checkbox" name="${todoItem.id}" class="todo_input" />
            <div class="optionsTodo" data-options="${todoItem.id}">
            <div class="btn_options">
              <span></span>
            </div>
            <div class="wrapper_options">
              <ul class="todo_options_list">
                <li class="todo_option_item" data-option="edit">Edit</li>
                <li class="todo_option_item" data-option="moveInbox">Move to Inbox</li>
                <li class="todo_option_item" data-option="moveToday">Move to Today</li>
                <li class="todo_option_item" data-option="moveDone">Move to Done</li>
                <li class="todo_option_item" data-option="delete">Delete</li>
              </ul>
            </div>
          </div>
            <label for="${todoItem.id}" contenteditable="false">${todoItem.text}</label>`
            todoItem.domItem = li
            if (todoItem.checked) {
                todoItem = this.checkedTodo(todoItem)
            }

            this.$todos.push(todoItem);
            this.id += 1;
        }

        deleteTodo(index) {
            this.$todos.splice(index, 1);
        }

        changeTab(index, strTab) {
            this.$todos[index].tab  = strTab
            // this.$todos.splice(index, 1, this.checkedTodo(updateItem));
        }
        checkedTodo(todoItem) {
            const { domItem, checked } = todoItem;
            const addCheckedStyles = (domElem) => {
                domElem.style.textDecorationLine = 'line-through';
                domElem.style.color = '#969696'
            }
            const removeCheckedStyles = (domElem) => {
                domElem.style.textDecorationLine = 'none';
                domElem.style.color = ''
            }
            if (checked) {
                domItem.firstChild.checked = true;
                addCheckedStyles(domItem.lastChild)
            } else {
                domItem.firstChild.checked = false;
                removeCheckedStyles(domItem.lastChild)
            }
            this.updateLocalStorage();
            return todoItem

        }

        toggleCheckedTodo(updateItem) {
            console.log(this.$todos)
            updateItem.checked = !updateItem.checked
            const index = this.$todos.findIndex(item => item === updateItem)
            this.$todos.splice(index, 1, this.checkedTodo(updateItem));
        }

        updateLocalStorage() {
            localStorage.setItem('todos', JSON.stringify(this.$todos));
            console.log(this.$todos, JSON.stringify(this.$todos))
        }

        editOn(index) {
            this.edit = true
            const label = this.$todos[index].domItem.querySelector('label');
            this.$todos[index].domItem.firstElementChild.disabled = this.edit; 
            label.contentEditable = this.edit;
            label.classList.add('active');
            label.focus();
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(label);
            range.collapse(false); 
            selection.removeAllRanges();
            selection.addRange(range);
            label.addEventListener('input', e => {
                this.$todos[index].text = label.textContent
                this.$todos.splice(index, 1, this.$todos[index])
                this.updateLocalStorage()
            });
            label.addEventListener("blur", () => {
                this.edit = false
                label.contentEditable = "false";
                this.$todos[index].domItem.firstElementChild.disabled = false; 
                label.contentEditable = false;
                label.classList.remove('active');
              });
        }

        getTodos() {
            return this.$todos;
        }

        renderToList(parent) {
            parent.innerHTML = '';
            this.$todos.forEach((todo, i) => {
                if (this.tab === todo.tab)
                parent.append(todo.domItem)
            })
            this.updateLocalStorage();
        }
    }

    const todo = new Todo();
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    storedTodos.forEach(todoItem => todo.addFromLocalStorage(todoItem));
    todo.renderToList(ul);
    const $textInput = document.querySelector('.todo_textAdd');
    const $ItemList = document.querySelector('.todo_list');
    $textInput.placeholder = 'new Todo';

    $textInput.addEventListener("keydown", function handler(event) {
        if (event.key === "Enter") {
            todo.createTodo(this.value)
            todo.renderToList(ul)
            $textInput.removeEventListener("keydown", handler);
            $textInput.value = "";
            $textInput.addEventListener("keydown", handler);
        }
    });

    const checkTodoListener = () => {
        $ItemList.addEventListener('click', e => {
            todo.getTodos().forEach((item, i) => {
                let btn = item.domItem.querySelector('.optionsTodo');
                let options = btn.querySelectorAll('[data-option]');
                if (btn.lastElementChild.classList.contains('active')) {
                    btn.firstElementChild.classList.remove('active');
                    btn.lastElementChild.classList.remove('active');
                    options.forEach(opt => {
                        if (e.target.contains(opt)) {
                            switch (e.target.dataset.option) {
                                case 'edit': console.log('edit'); todo.editOn(i); break;
                                case 'delete': todo.deleteTodo(i); todo.renderToList(ul); break;
                                case 'moveInbox': todo.changeTab(i, 'Inbox'); todo.renderToList(ul); break;
                                case 'moveToday': todo.changeTab(i, 'Today'); todo.renderToList(ul); break;
                                case 'moveDone': todo.changeTab(i, 'Done');  todo.renderToList(ul); break;
                            }
                        }
                    })  
                }
                console.log(todo.edit)
                if (!todo.edit) {    
                    if (item.domItem.firstElementChild.contains(e.target) || item.domItem.lastElementChild.contains(e.target)) {
                        todo.toggleCheckedTodo(item);
                    }
                }
                if (btn.firstElementChild.contains(e.target)) {
                    btn.firstElementChild.classList.toggle('active');
                    btn.lastElementChild.classList.toggle('active');
                }
               


            })
        })

    }

    checkTodoListener();
    const selected = (selectTab) => {
        todo.tab = selectTab.textContent
        console.log(todo.getTodos());
        todo.renderToList(ul)
    }
    customSelect('.todo_drop', '.select_head', '.active', '.select_list', '.active', '.select_item', selected);
    customSelect('.todo_drop', '.select_head', '.active', '.select_list', '.active', '.select_item', selected);

}
export default ToDo