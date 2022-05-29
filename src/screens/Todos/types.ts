export type TodoType = {
  _id: string;
  text: string;
  completed: boolean;
};

export type ParentTodoType = {
  _id: string;
  text: string;
  completed: boolean;
  subSteps: TodoType[];
};
