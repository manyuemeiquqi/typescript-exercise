
// pick a set of properties whose keys are in union k
// omit 省去 遗漏 pick 选择
type MyPick<T,K extends keyof T> = {
    [X in K]:T[X]
}

interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;

type TypeArticle = Pick<Todo,"title"|"description">

const article:TypeArticle = {
    title:"xinxing",
    description:"desc"
}
type TodoInfo = Omit<Todo, "completed" | "createdAt">;
