let subject_id = 0;

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
class SelectButton{
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
