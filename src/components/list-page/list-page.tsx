import React, { useState } from "react";
import { getRandomArray } from "../sorting-page/utils";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./class";
import style from "./list-page.module.css";
export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>({ value: "", index: "" });
  const handleChange = (e: any) =>
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
const [linkedList] = useState<any>(new LinkedList())
linkedList.fromArray(getRandomArray(3, 3))
console.log(linkedList.toArray())
  return (
    <SolutionLayout title="Связный список">
      <div className={style.wrapper}>
        <Input
          name="value"
          type="text"
          isLimitText={true}
          maxLength={4}
          value={`${inputValue?.value}`}
          onChange={handleChange}
        />

        <Button
          /*  onClick={handleClickEnqueue}
          isLoader={loaderEnqueue} */
          text="Добавить в head"
          /* disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          /*  onClick={handleClickDequeue}
          isLoader={loaderDequeue} */
          text="Добавить в tail"
          /*  disabled={loaderEnqueue || !!queue.isEmpty()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          /* onClick={handleClickEnqueue}
          isLoader={loaderEnqueue} */
          text="Удалить из head"
          /*   disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          /*    onClick={handleClickDequeue}
          isLoader={loaderDequeue} */
          text="Удалить из tail"
          /*  disabled={loaderEnqueue || !!queue.isEmpty()} */
          linkedList="big"
          extraClass={style.btn}
        />
      </div>
      <div className={style.wrapperIndex}>
        <Input
          name="index"
          type="number"
          /* isLimitText={true}
          maxLength={4} */
          value={`${inputValue?.index}`}
          onChange={handleChange}
        />

        <Button
          /*  onClick={handleClickEnqueue}
          isLoader={loaderEnqueue} */
          text="Добавить в head"
          /* disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btnIndex}
        />
        <Button
          /*  onClick={handleClickDequeue}
          isLoader={loaderDequeue} */
          text="Добавить в tail"
          /*  disabled={loaderEnqueue || !!queue.isEmpty()} */
          linkedList="big"
          extraClass={style.btnIndex}
        />
      </div>
      <div className={style.listWrapper}>


      </div>
    </SolutionLayout>
  );
};
