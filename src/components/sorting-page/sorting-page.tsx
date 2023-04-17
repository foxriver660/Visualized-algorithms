import React, { ChangeEvent, useState } from "react";
import { Direction } from "../../types/direction";
import { TElement } from "../../types/element";
import { getRandomArray } from "../../utils/random-generate";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import style from "./sorting-page.module.css";
import { bubbleSort, selectionSort } from "./utils";

// !ПОДУМАТЬ НАД ТИПИЗАЦИЕЙ arr
export const SortingPage: React.FC = () => {
  const [arr, setArr] = useState<any>([]);
  const [value, setValue] = useState("selection");
  const [loaderIncrease, setLoaderIncrease] = useState(false);
  const [loaderDecrease, setLoaderDecrease] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  console.log(arr);
  const handleClickSortIncrease = () => {
    if (value === "selection") {
      setArr(selectionSort(arr, setArr, setLoaderIncrease, false));
    } else {
      setArr(bubbleSort(arr, setArr, setLoaderIncrease, false));
    }
  };
  const handleClickSortDecrease = () => {
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
          onChange={handleChange}
        />
        <RadioInput
          label="Пузырёк"
          name="sort"
          value="bubble"
          extraClass="pr-25"
          checked={value === "bubble" ? true : false}
          onChange={handleChange}
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
      <ul className={style.sortWrapper}>
        {arr.length &&
          arr.map((item: TElement, index: number) => (
            <li key={index}>
              <Column index={Number(item.value)} state={item.color} />
            </li>
          ))}
      </ul>
    </SolutionLayout>
  );
};
