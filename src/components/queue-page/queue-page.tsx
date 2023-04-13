import React, { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Queue } from "./class";
import style from "./queue-page.module.css";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState<any>("");
  const [queue] = useState<any>(new Queue<any>(7));
  const [arr, setArr] = useState<any>(queue.getContainer());
  const [loaderEnqueue, setLoaderEnqueue] = useState(false);
  const [loaderDequeue, setLoaderDequeue] = useState(false);
  const handleChange = (e: any) => setInputValue(e.target.value);

  const handleClickEnqueue = async (e: any) => {
    if (inputValue) {
      setLoaderEnqueue(true);
      queue.enqueue({ value: inputValue, color: ElementStates.Changing });
      setInputValue("");
      setArr([...queue.getContainer()]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      queue.getContainer()[queue.getTail() - 1].color = ElementStates.Default;
      setArr([...queue.getContainer()]);
      setLoaderEnqueue(false);
    }
  };

  const handleClickDequeue = async (e: any) => {
    setLoaderDequeue(true);
    queue.getContainer()[queue.getHead()].color = ElementStates.Changing;
    setArr([...queue.getContainer()]);
    await new Promise((resolve) => setTimeout(resolve, 500));
    queue.dequeue();
    setArr([...queue.getContainer()]);
    setLoaderDequeue(false);
  };

  const handleClickClear = (e: any) => {
    queue.reset();
    setArr([...queue.getContainer()]);
  };
  
  return (
    <SolutionLayout title="Очередь">
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
          onClick={handleClickEnqueue}
          isLoader={loaderEnqueue}
          text="Добавить"
          disabled={loaderDequeue || !inputValue || queue.isFullQueue()}
          linkedList="small"
          extraClass={`mr-6 ${style.addBtn}`}
        />
        <Button
          onClick={handleClickDequeue}
          isLoader={loaderDequeue}
          text="Удалить"
          disabled={loaderEnqueue || !!queue.isEmpty()}
          linkedList="small"
          extraClass={`mr-40 ${style.deleteBtn}`}
        />
        <Button
          onClick={handleClickClear}
          text="Очистить"
          disabled={loaderDequeue || loaderEnqueue || !!queue.isEmpty()}
          linkedList="small"
          extraClass={style.clearBtn}
        />
      </div>
      <div className={style.queueWrapper}>
        {arr.map((item: any, index: number) => (
          <Circle
            key={index}
            index={index}
            letter={item.value}
            state={item.color}
            head={
              (index === queue.getHead() && !queue.isEmpty()) || item.head
                ? "head"
                : ""
            }
            tail={
              index === queue.getTail() - 1 && !queue.isEmpty() ? "tail" : ""
            }
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
