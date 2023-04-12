import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<any>("");
  const [stack, setStack] = useState<any>([]);
  const [loaderAdd, setLoaderAdd] = useState(false);
  const [loaderDelete, setLoaderDelete] = useState(false);
  const handleChange = (e: any) => setNumberInput(e.target.value);

  const handleClickAdd = async (e: any) => {
    if (numberInput) {
      setLoaderAdd(true);
      stack.push({ value: numberInput, color: ElementStates.Changing });
      setNumberInput("");
      await new Promise((resolve) => setTimeout(resolve, 500));
      stack[stack.length - 1].color = ElementStates.Default;
      setStack([...stack]);
      setLoaderAdd(false);
    }
  };

  const handleClickDelete = async (e: any) => {
    setLoaderDelete(true);
    stack[stack.length - 1].color = ElementStates.Changing;
    setStack([...stack]);
    stack.pop();
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStack([...stack]);
    setLoaderDelete(false);
  };

  const handleClickClear = (e: any) => {
    setStack([]);
  };

  const getPosition = (index: number, arr: any): string => {
    if (index === arr.length - 1) {
      return "top";
    } else {
      return "";
    }
  };
  return (
    <SolutionLayout title="Стек">
      <div className={style.wrapper}>
        <Input
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${numberInput}`}
          onChange={handleChange}
          extraClass="mr-6"
        />

        <Button
          onClick={handleClickAdd}
          isLoader={loaderAdd}
          text="Добавить"
          disabled={loaderDelete}
          linkedList="small"
          extraClass={`mr-6 ${style.addBtn}`}
        />
        <Button
          onClick={handleClickDelete}
          isLoader={loaderDelete}
          text="Удалить"
          disabled={loaderAdd}
          linkedList="small"
          extraClass={`mr-40 ${style.deleteBtn}`}
        />
        <Button
          onClick={handleClickClear}
          text="Очистить"
          disabled={loaderDelete || loaderAdd}
          linkedList="small"
          extraClass={style.clearBtn}
        />
      </div>
      <div className={style.stackWrapper}>
        {stack.map((item: any, index: number) => (
          <Circle
            key={index}
            index={index}
            letter={item.value}
            state={item.color}
            head={getPosition(index, stack)}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
