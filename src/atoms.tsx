import { atom, selector } from "recoil";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}
export const toDoState = atom<IToDo[]>({
  key: "toDO",
  default: [],
});

export const categoryState = atom({
  key: "category",
  default: "TO_DO",
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});

/**
 * opts : {get}  get 함수는 atom의 state를 가져오는 함수
 * component 내부에서 구현해도 되지만, component는 렌더링만 담당하는게 유지 보수에 좋음
 */
