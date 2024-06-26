const todoList = [];
const subjectList = [];
const options = [
    { text: 'all', value: 2 },
    { text: 'done', value: 1 },
    { text: 'undo', value: 0 }
];
const subjectListNode = document.createElement('main');
document.body.append(subjectListNode);

function makeFilter(subject) {
    let selectButton = document.createElement('select');
    selectButton.id = "todo-status-filter";
    let optionList = [];

    options.forEach((option)=>{
        const opt = new Option(option.text, option.value);
        optionList.push(opt);
    })
    optionList.forEach((option)=>{
        selectButton.add(option.getOptionNode());
    })
    
    selectButton.addEventListener('change', function(){
        if(selectButton.value != 2){
            const tmpSubject = new Subject()
            tmpSubject.todos = subject.todos.filter((todo)=> todo.status == selectButton.value);
            tmpSubject.id = subject.id;
            drawTodolist(tmpSubject);
        }else{
            drawTodolist(subject);
        }
    })
    return selectButton;
}
 function makeSubject() {
    console.log(" a subject!")
    let newSubject = new Subject();
    subjectList.push(newSubject);
    const subjectSection = document.createElement('section');
    let subjectHeader = document.createElement('div');
    let subjectTitle = document.createElement('input');
    let subjectTodoList = document.createElement('div');
    subjectTodoList.className = 'subject-todo-list';
    subjectTodoList.id = newSubject.id;
    const makeButton = document.createElement('button');
    makeButton.addEventListener('click', makeToDo(newSubject, subjectTodoList));
    makeButton.textContent = 'add to do';
    subjectHeader = subjectHeaderStyle(subjectHeader);
    subjectTitle = subjectTitleStyle(subjectTitle);
    subjectHeader.append(subjectTitle, makeFilter(newSubject), makeButton);
    subjectSection.append(subjectHeader, subjectTodoList);
    subjectListNode.append(subjectSection);

}


 
function makeToDo(subject, subjectNode){
    return function(){
        console.log('Made a todo!');
        let newTodo = new Todo();
        subject.addTodo(newTodo);
        let newNode = document.createElement('div');
        let newInput = document.createElement('input');
        let upButton = new SelectButton('Up',  moveUp(subject, findIdx(subject, newTodo.getId())));
        let downButton = new SelectButton('Down',  moveDown(subject,findIdx(subject, newTodo.getId())));
        let doneButton = new SelectButton('Done',  completeTodo(newInput, newTodo));
        let undoButton = new SelectButton('Undo',  cancleTodo(newInput, newTodo));
        let deleteButton = new SelectButton('Delete', deleteTodo(subject, findIdx(subject, newTodo.getId())));
        newNode.className='subject-todo'
        newNode.id = `subject-todo-${subject.id}-${newTodo.id}`;
        newInput = inputStyle(newInput);
        newInput.addEventListener('input', function(e){
            newTodo.content = e.target.value;
        })
        newNode.append(newInput, upButton.getButtonNode(), downButton.getButtonNode(), doneButton.getButtonNode(), undoButton.getButtonNode(), deleteButton.getButtonNode());
        subjectNode.append(newNode);
    }
}
function completeTodo(node, todo){
    return function(){
        todo.status = 1;
        node.style.textDecoration ="line-through";
    }
}
function cancleTodo(node, todo){
    return function(){
        todo.status = 0;
        node.style.textDecoration ="none";
    }
}
function deleteTodo(subject, idx){
    return function(){
        console.log(idx);
        console.log(subject.todos);
        subject.todos.splice(idx, 1);
        console.log(subject.todos);
        drawTodolist(subject);
    }
 
}
function findIdx(subject, idx){
    return subject.todos.findIndex((todo) => todo.id == idx) ;
}
function moveUp(subject, idx){
    return function(){
        if(idx !== 0){
            switchValue(subject.todos, idx, idx-1);
            drawTodolist(subject);
        }
    }
}
function moveDown(subject, idx){
    return function(){
        if(idx !== subject.todos.length - 1){
            switchValue(subject.todos, idx, idx+1);
            drawTodolist(subject);
        }
    }
}
function filterAll(v){
    subjectList.forEach((subject)=>{
        if(v == 2){
            drawTodolist(subject);
        }else{
            const tmpSubject = new Subject()
            tmpSubject.id = subject.id;
            tmpSubject.todos = subject.todos.filter((todo)=> todo.status == v)
            drawTodolist(tmpSubject);
        }
    })
}
function drawTodolist(subject){
    let todoList = document.getElementById(subject.id);
    todoList.textContent="";

    subject.todos.forEach((todo)=> {
        let newInput = document.createElement('input');
        let upButton = new SelectButton('Up',  moveUp(subject, findIdx(subject, todo.getId())));
        let downButton = new SelectButton('Down',  moveDown(subject,findIdx(subject, todo.getId())));
        let doneButton = new SelectButton('Done',  completeTodo(newInput, todo));
        let undoButton = new SelectButton('Undo',  cancleTodo(newInput, todo));
        let deleteButton = new SelectButton('Delete', deleteTodo(subject, findIdx(subject, todo.getId())));

        let newNode = document.createElement('div');
        newNode.className='subject-todo'
        newNode.id = `subject-todo-${subject.id}-${todo.id}`;
        if(todo.status == 1){
            newInput.style.textDecoration = 'line-through';
        }
        newInput = inputStyle(newInput);
        newInput.addEventListener('input', function(e){
            todo.content = e.target.value;
        })
        newInput.value = todo.content;
        newNode.append(newInput, upButton.getButtonNode(), downButton.getButtonNode(), doneButton.getButtonNode(), undoButton.getButtonNode(), deleteButton.getButtonNode());
        todoList.append(newNode);
    })
}