import React, { ChangeEvent, SetStateAction, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./string.module.css";

const swap = (arr: any, i: any, j: any) =>
  ([arr[i], arr[j]] = [arr[j], arr[i]]);

export const StringComponent: React.FC = () => {
  const [textInput, setTextInput] = useState<any>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: any) =>
    setTextInput(
      e.target.value.split("").map((value: string) => {
        return { value, color: ElementStates.Default };
      })
    );

  const handleClick = async (textInput: any) => {
    setLoader(true);
    const mid = Math.ceil(textInput.length / 2);

    for (let i = 0; i < mid; i++) {
      let j = textInput.length - 1 - i;

      if (i !== j) {
        textInput[i].color = ElementStates.Changing;
        textInput[j].color = ElementStates.Changing;
        setTextInput([...textInput]);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      swap(textInput, i, j);

      textInput[i].color = ElementStates.Modified;
      textInput[j].color = ElementStates.Modified;

      setTextInput([...textInput]);
    }
    setLoader(false);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={style.wrapper}>
        <Input isLimitText={true} maxLength={11} onChange={handleChange} />
        <Button
          onClick={(e) => handleClick(textInput)}
          isLoader={loader}
          text="Развернуть"
          disabled={textInput.length ? false : true}
          linkedList="small"
        />
      </div>
      <div className={style.circleWrapper}>
        {textInput.map((item: any, index: number | undefined) => (
          <Circle key={index} letter={item.value} state={item.color} />
        ))}
      </div>
    </SolutionLayout>
  );
};
