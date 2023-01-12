import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

export default function ToDo({ text, id, category }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  // 클릭 시, category 변경
  const changeCategory = (newCategory: IToDo["category"]) => {
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: newCategory };
      const front = oldToDos.slice(0, targetIdx);
      const back = oldToDos.slice(targetIdx + 1);
      return [...front, newToDo, ...back];
    });
  };

  const deleteToDo = () => {
    setToDos((oldToDos) => {
      const targetIdx = oldToDos.findIndex((toDo) => toDo.id === id);
      const front = oldToDos.slice(0, targetIdx);
      const back = oldToDos.slice(targetIdx + 1);

      return [...front, ...back];
    });
  };

  return (
    <li key={id}>
      {text}
      {/* Change Category Button */}
      {category === Categories.TO_DO ? null : (
        <button
          name={Categories.TO_DO}
          onClick={() => changeCategory(Categories.TO_DO)}
        >
          ToDo
        </button>
      )}
      {category === Categories.DOING ? null : (
        <button
          name={Categories.DOING}
          onClick={() => changeCategory(Categories.DOING)}
        >
          Doing
        </button>
      )}
      {category === Categories.DONE ? null : (
        <button
          name={Categories.DONE}
          onClick={() => changeCategory(Categories.DONE)}
        >
          Done
        </button>
      )}

      {/* Delete Button */}
      <button onClick={deleteToDo}>Delete</button>
    </li>
  );
}
