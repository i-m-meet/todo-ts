import "./style.css";

interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}

const todos: Array<Todo> = [];

const todosContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;

const todoInput = document.getElementsByName("title")[0] as HTMLInputElement;

const myForm = document.getElementById("myForm") as HTMLFormElement;

myForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: crypto.randomUUID(),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodo(todos);
};

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo = document.createElement("div") as HTMLDivElement;
  todo.className = "todo";

  //   creating a checkbox along with added task
  const checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.setAttribute("type", "checkbox");
  checkbox.className = "isCompleted";
  checkbox.checked = isCompleted;
  checkbox.onchange = () => {
    todos.find((item) => {
        if(item.id === id) item.isCompleted = checkbox.checked
    })
    paragraph.className = checkbox.checked ? "textCut" : " ";
  };

  //   creating p for title

  const paragraph = document.createElement("p") as HTMLParagraphElement;
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "textCut" : " ";
  // creating delete button

  const btn = document.createElement("button");
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {
    deleteTodo(id);
  };

  // Appending todo item
  todo.append(checkbox, paragraph, btn);
  todosContainer.append(todo);
};
const deleteTodo = (id: string) => {
  const idX = todos.findIndex((item) => item.id === id);
  todos.splice(idX, 1)
  renderTodo(todos)
};

const renderTodo = (todos: Todo[]) => {
    todosContainer.innerText = "";
    todos.forEach((item) => {
        generateTodoItem(item.title, item.isCompleted, item.id);
    });
};

