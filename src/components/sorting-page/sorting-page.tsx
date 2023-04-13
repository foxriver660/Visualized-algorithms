import React, { useState } from "react";
import { Direction } from "../../types/direction";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { bubbleSort, getRandomArray, selectionSort } from "./utils";
export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<any>([]);
  const [value, setValue] = useState("selection");
  const [loaderIncrease, setLoaderIncrease] = useState(false);
  const [loaderDecrease, setLoaderDecrease] = useState(false);
  function changeValue(e: any) {
    setValue(e.target.value);
  }
  const handleClickSortIncrease = (e: any) => {
    if (value === "selection") {
      setArr(selectionSort(arr, setArr, setLoaderIncrease, false));
    } else {
      setArr(bubbleSort(arr, setArr, setLoaderIncrease, false));
    }
  };
  const handleClickSortDecrease = (e: any) => {
    if (value === "selection") {
      setArr(selectionSort(arr, setArr, setLoaderDecrease));
    } else {
      setArr(bubbleSort(arr, setArr, setLoaderDecrease));
    }
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={style.wrapper}>
        <RadioInput
          label="Выбор"
          name="sort"
          value="selection"
          extraClass="pr-20"
          checked={value === "selection" ? true : false}
          onChange={changeValue}
        />
        <RadioInput
          label="Пузырёк"
          name="sort"
          value="bubble"
          extraClass="pr-25"
          checked={value === "bubble" ? true : false}
          onChange={changeValue}
        />
        <Button
          onClick={handleClickSortIncrease}
          isLoader={loaderIncrease}
          text="По возрастанию"
          disabled={loaderDecrease}
          linkedList="big"
          sorting={Direction.Descending}
          extraClass="mr-6"
        />
        <Button
          onClick={handleClickSortDecrease}
          isLoader={loaderDecrease}
          text="По убыванию"
          disabled={loaderIncrease}
          linkedList="big"
          sorting={Direction.Ascending}
          extraClass="mr-40"
        />
        <Button
          onClick={(e) => setArr(getRandomArray(3, 18))}
          text="Новый массив"
          disabled={loaderDecrease || loaderIncrease}
          linkedList="big"
        />
      </div>
      <div className={style.sortWrapper}>
        {arr.length &&
          arr.map((item: any, index: number) => (
            <Column key={index} index={item.value} state={item.color} />
          ))}
      </div>
    </SolutionLayout>
  );
};
