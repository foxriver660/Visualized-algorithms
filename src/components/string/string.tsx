import React, { ChangeEvent, useState } from "react";
import { TElement } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";
import { expandString } from "./utils";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<TElement[]>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(
      e.target.value.split("").map((value: string) => {
        return { value, color: ElementStates.Default };
      })
    );

  const handleClick = () => {
    expandString(inputValue, setInputValue, setLoader);
  };
  return (
    <SolutionLayout title="Строка">
      <div className={style.wrapper}>
        <Input isLimitText={true} maxLength={11} onChange={handleChange} />
        <Button
          onClick={handleClick}
          isLoader={loader}
          text="Развернуть"
          disabled={!inputValue.length}
          linkedList="small"
        />
      </div>
      <ul className={style.stringWrapper}>
        {inputValue.map((item: TElement, index: number) => (
          <li key={index}>
            <Circle letter={item.value} state={item.color} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
