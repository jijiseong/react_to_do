import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

export default function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = ({ toDo }) => {
    console.log(toDos);
    setToDos((cur) => [{ text: toDo, category, id: Date.now() }, ...cur]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("toDo", { required: "write!!" })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </form>
  );
}
