function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

console.log(add(1, 2));
console.log(subtract(1, 2));
console.log(multiply(1, 2));
console.log(divide(1, 2));

// 투두 리스트를 가져오는 함수
function getTodoList() {
    return [
        { id: 1, title: '할 일 1', completed: false },
        { id: 2, title: '할 일 2', completed: true },
        { id: 3, title: '할 일 3', completed: false },
    ];
}

console.log(getTodoList());