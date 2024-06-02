function inputStyle(node){
    node.style.borderWidth='0 0 1px';
    node.style.margin='0px 5px 0px 0px';
    node.placeholder="input your to do"
    node.style.width="70%";
    return node;
}

function subjectHeaderStyle(node){
    node.style.height='40px';
    node.style.display='flex';
    node.style.justifyContent='space-between';
    return node;
}

function subjectTitleStyle(node){
    node.style.width='80%';
    node.style.borderWidth='0px';
    node.placeholder='input title';
    node.style.fontSize='24px';
    return node;
}
