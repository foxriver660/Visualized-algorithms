import { format } from "path";
import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./fibonacci-page.module.css";

const fib = (n: number) => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr; 
};

export const FibonacciPage: React.FC = () => {
  const [numberInput, setNumberInput] = useState<any>(null);
  const [fibArr, setFibArr] = useState<any>([]);
  const [loader, setLoader] = useState(false);
  const handleChange = (e: any) => setNumberInput(Number(e.target.value));
  const handleClick = async () => {
    const arr = fib(numberInput);
    setLoader(true);
    for (let i = 0; i < arr.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setFibArr(arr.slice(0, i + 1));
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
          text="Развернуть"
          disabled={numberInput <= 19 && numberInput >= 1 ? false : true}
          linkedList="small"
        />
      </div>
      <div className={style.numbersWrapper}>
        {fibArr.map((n: number, index: number) => (
          <Circle key={index} letter={`${n}`} index={index} />
        ))}
      </div>
    </SolutionLayout>
  );
};
