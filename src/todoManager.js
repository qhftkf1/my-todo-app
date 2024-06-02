let subject_id = 0;
const todoList = [];
const subjectList = [];
const optionList = [];
const options = [
    { text: 'all', value: 2 },
    { text: 'done', value: 1 },
    { text: 'undo', value: 0 }
];
class Subject{
    constructor(title){
        this.id = subject_id++;
        this.title = title;
        this.todos = [];
    }
    setTitle(newTitle){
        this.title = newTitle;
    }
    addTodo(newTodo){
        if(!(this.todos.includes(newTodo))) this.todos.push(newTodo);
    }
    getId(){
        return this.id;
    }
}
let todo_id = 0;
class Todo {
    constructor(content, subject) {
        this.id = todo_id++;
        this.status = 0;
        this.content = content;
        this.subject = subject;
    }
    setContent(content){
        this.content = content
    }
    setStatus(status){
        this.status = status;
    }
    getId(){
        return this.id;
    }
}
class SelectButotn{
    constructor(content, event){
        this.text = content;
        this.node = document.createElement('button');
        this.node.textContent = content;
        this.node.addEventListener('click', event);
    }
    getButtonNode(){
        return this.node;
    }
}

class Option{
    constructor(text, value){
        this.optionNode = document.createElement('option');
        this.optionNode.value = value;
        this.optionNode.textContent = text;
    }
    getOptionNode(){
        return this.optionNode;
    }
}
