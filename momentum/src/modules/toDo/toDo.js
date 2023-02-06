import customSelect from "../customSelect/customSelect";

const ToDo = () => {

const textInput = document.querySelector('.todo_textAdd');
textInput.placeholder = 'new Todo'

customSelect('.todo_drop', '.select_head', '.active', '.select_list', '.active', '.select_item')


}


export default ToDo