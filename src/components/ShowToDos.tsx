import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";

const Container = styled.div`
  display: flex;
`;

export default function ShowToDos() {
  const toDos = useRecoilValue(toDoSelector);
  const category = useRecoilValue(categoryState);

  return (
    <Container>
      <ul>
        <h2>{category}</h2>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </Container>
  );
}
