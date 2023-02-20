
import customSelect from "../customSelect/customSelect";

const ToDo = (lang) => {
    const todoList = document.querySelector('.todo_list');
    const ul = todoList.querySelector('ul');
    const text = {
        'ru': [
                ['Редактировать', 'Переместить в Черновик', 'Переместить в Сегодня', 'Переместить в Выполнено', 'Удалить'],
                ['Черновик', 'Сегодня', 'Выполнено'],
                ['Добавить запись', 'Список дел']
              ],
        'en': [
                ['Edit', 'Move to Inbox', 'Move to Today', 'Move to Done', 'Delete'],
                ['Inbox', 'Today', 'Done'],
                ['new Todo', 'ToDo']
              ],
    }
    const selectItems = document.querySelectorAll('.select_item');
    selectItems.forEach((item, i) => {
        item.textContent = text[lang][1][i];
    })
    const mainBtn = document.querySelector('.todo_btn')

    mainBtn.textContent = text[lang][2][1];
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
                <li class="todo_option_item" data-option="edit">${text[lang][0][0]}</li>
                <li class="todo_option_item" data-option="moveInbox">${text[lang][0][1]}</li>
                <li class="todo_option_item" data-option="moveToday">${text[lang][0][2]}</li>
                <li class="todo_option_item" data-option="moveDone">${text[lang][0][3]}</li>
                <li class="todo_option_item" data-option="delete">${text[lang][0][4]}</li>
              </ul>
            </div>
          </div>
            <label for="${todoItem.id}" contenteditable="false">${todoItem.text}</label>`

            this.$todos.push(todoItem);
            this.id += 1;
        }
        addFromLocalStorage(todoItem) {
            let li = document.createElement('li');
            li.classList.add('li_todo');
            
            const checklang = document.querySelector('.select-language');

            li.innerHTML = `<input type="checkbox" name="${todoItem.id}" class="todo_input" />
            <div class="optionsTodo" data-options="${todoItem.id}">
            <div class="btn_options">
              <span></span>
            </div>
            <div class="wrapper_options">
              <ul class="todo_options_list">
              <li class="todo_option_item" data-option="edit">${text[lang][0][0]}</li>
              <li class="todo_option_item" data-option="moveInbox">${text[lang][0][1]}</li>
              <li class="todo_option_item" data-option="moveToday">${text[lang][0][2]}</li>
              <li class="todo_option_item" data-option="moveDone">${text[lang][0][3]}</li>
              <li class="todo_option_item" data-option="delete">${text[lang][0][4]}</li>
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
            this.$todos[index].tab = strTab
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
                parent.append(todo.domItem)
                todo.domItem.style.display = 'flex'
                if (this.tab !== todo.tab)
                    todo.domItem.style.display = 'none'
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
    $textInput.placeholder = text[lang][2][0]

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
        const handler = (e) => {
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
                                case 'moveDone': todo.changeTab(i, 'Done'); todo.renderToList(ul); break;
                            }
                        }
                    })
                }
                
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
        }
        
            $ItemList.addEventListener('click', handler );
        

    }

    checkTodoListener();
    const selected = (selectTab) => {
        todo.tab = selectTab.dataset.optionitem
        console.log(todo.getTodos());
        todo.renderToList(ul)
    }
    customSelect('.todo_drop', '.select_head', '.active', '.select_list', '.active', '.select_item', selected);

    const $btnTodo = document.querySelector('.todo_btn');
    const $desk = document.querySelector('.todo_desk')
    const activeDesk = () => $desk.classList.toggle('active');
    
    $btnTodo.addEventListener('click', activeDesk)
    
}

const translateTodo = (lang) => {
    const text = {
        'ru': [
                ['Редактировать', 'Переместить в Черновик', 'Переместить в Сегодня', 'Переместить в Выполнено', 'Удалить'],
                ['Черновик', 'Сегодня', 'Выполнено'],
                ['Добавить запись', 'Список дел']
              ],
        'en': [
                ['Edit', 'Move to Inbox', 'Move to Today', 'Move to Done', 'Delete'],
                ['Inbox', 'Today', 'Done'],
                ['new Todo', 'ToDo']
              ],
    }
    const selectItems = document.querySelectorAll('.select_item');
    selectItems.forEach((item, i) => {
        item.textContent = text[lang][1][i];
    })
    const mainBtn = document.querySelector('.todo_btn')
    mainBtn.textContent = text[lang][2][1];
    const optionsItems = document.querySelectorAll('.todo_option_item');
    optionsItems.forEach(item => {
        switch (item.dataset.option) {
            case 'edit': item.textContent = text[lang][0][0]; break;
            case 'delete': item.textContent = text[lang][0][1]; break;
            case 'moveInbox': item.textContent = text[lang][0][2]; break;
            case 'moveToday': item.textContent = text[lang][0][3]; break;
            case 'moveDone': item.textContent = text[lang][0][4]; break;
        }
    })
    const selectHead = document.querySelector('.select_head');
    selectHead.textContent = lang === 'ru' ? text['ru'][1][text['en'][1].findIndex(text => text === selectHead.textContent)] : text['en'][1][text['ru'][1].findIndex(text => text === selectHead.textContent)]
    const $textInput = document.querySelector('.todo_textAdd');
    $textInput.placeholder = text[lang][2][0]
}


export {ToDo, translateTodo}