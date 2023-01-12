import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

export default function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((oldTodos) => {
      const targetIdx = oldTodos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const front = oldTodos.slice(0, targetIdx);
      const back = oldTodos.slice(targetIdx + 1);

      return [...front, newToDo, ...back];
    });
  };

  return (
    <li key={id}>
      {text}
      {category === "TO_DO" ? null : (
        <button onClick={() => onClick("TO_DO")}>ToDo</button>
      )}
      {category === "DOING" ? null : (
        <button onClick={() => onClick("DOING")}>Doing</button>
      )}
      {category === "DONE" ? null : (
        <button onClick={() => onClick("DONE")}>Done</button>
      )}
    </li>
  );
}
