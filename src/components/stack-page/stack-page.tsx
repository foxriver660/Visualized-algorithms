import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./stack-page.module.css";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>("");
  const [stack, setStack] = useState<any>([]);
  const [loaderAdd, setLoaderAdd] = useState(false);
  const [loaderDelete, setLoaderDelete] = useState(false);
  const handleChange = (e: any) => setInputValue(e.target.value);

  const handleClickPush = async (e: any) => {
    if (inputValue) {
      setLoaderAdd(true);
      stack.push({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      await new Promise((resolve) => setTimeout(resolve, 500));
      stack[stack.length - 1].color = ElementStates.Default;
      setStack([...stack]);
      setLoaderAdd(false);
    }
  };

  const handleClickPop = async (e: any) => {
    setLoaderDelete(true);
    stack[stack.length - 1].color = ElementStates.Changing;
    /* setStack([...stack]); */
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
          value={`${inputValue}`}
          onChange={handleChange}
          extraClass="mr-6"
        />

        <Button
          onClick={handleClickPush}
          isLoader={loaderAdd}
          text="Добавить"
          disabled={loaderDelete || !inputValue}
          linkedList="small"
          extraClass={`mr-6 ${style.addBtn}`}
        />
        <Button
          onClick={handleClickPop}
          isLoader={loaderDelete}
          text="Удалить"
          disabled={loaderAdd || !stack.length}
          linkedList="small"
          extraClass={`mr-40 ${style.deleteBtn}`}
        />
        <Button
          onClick={handleClickClear}
          text="Очистить"
          disabled={loaderDelete || loaderAdd || !stack.length}
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
