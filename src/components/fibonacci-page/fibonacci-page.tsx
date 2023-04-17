import React, { ChangeEvent, useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timeOut } from "../../utils/delay";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";
import { getFibonacciNumbers } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<number>(0);
  const [renderArr, setRenderArr] = useState<number[]>([]);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setNumberInput(Number(e.target.value));

  const handleClick = async () => {
    const arr = getFibonacciNumbers(numberInput);
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      await timeOut(SHORT_DELAY_IN_MS);
      setRenderArr(arr.slice(0, i + 1));
    }
    setLoader(false);
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.wrapper}>
        <Input
          type="number"
          isLimitText={true}
          max={19}
          onChange={handleChange}
        />
        <Button
          onClick={handleClick}
          isLoader={loader}
          text="Рассчитать"
          disabled={numberInput <= 19 && numberInput >= 1 ? false : true}
          linkedList="small"
          value={numberInput}
        />
      </div>
      <ul className={style.numbersWrapper}>
        {renderArr.map((n: number, index: number) => (
          <li key={index}>
            <Circle letter={`${n}`} index={index} />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
