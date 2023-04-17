import React, { ChangeEvent, useState } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { TElement } from "../../types/element";
import { ElementStates } from "../../types/element-states";
import { timeOut } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";
import { swap } from "./utils";


export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<TElement[]>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setInputValue(
      e.target.value.split("").map((value: string) => {
        return { value, color: ElementStates.Default };
      })
    );

  const handleClick = async (value: TElement[]) => {
    setLoader(true);
    const mid = Math.ceil(value.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = value.length - 1 - i;

      if (i !== j) {
        value[i].color = ElementStates.Changing;
        value[j].color = ElementStates.Changing;
        setInputValue([...value]);
        await timeOut(DELAY_IN_MS);
      }

      swap(value, i, j);

      value[i].color = ElementStates.Modified;
      value[j].color = ElementStates.Modified;

      setInputValue([...value]);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.wrapper}>
        <Input isLimitText={true} maxLength={11} onChange={handleChange}/>
        <Button
          onClick={(e) => handleClick(inputValue)}
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
