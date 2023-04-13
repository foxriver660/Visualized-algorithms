import React, { useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { getRandomArray } from "../sorting-page/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./class";
import style from "./list-page.module.css";
export const ListPage: React.FC = () => {
  const [addNode, setAddNode] = useState(false);
  const [addIndex, setAddIndex] =useState<any>(null)
  const [inputValue, setInputValue] = useState<any>({ value: "", index: "" });
  const [linkedList] = useState<any>(new LinkedList(getRandomArray(3, 3)));

/*   linkedList.fromArray(getRandomArray(3, 3)); */
  const [arr, setArr] = useState<any>(linkedList.toArray());
  const handleChange = (e: any) =>
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  const handleClickPrepend = async (e: any) => {
    setAddNode(true)
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.prepend({value: inputValue.value, color: ElementStates.Modified})
    setAddIndex(linkedList.getLength())
    setAddNode(false)
    setArr(linkedList.toArray())
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.getLastAddedNode().value= {value: inputValue.value, color: ElementStates.Default}
    setArr(linkedList.toArray())
   
  }
  const handleClickAppend = async (e: any) => {
    setAddNode(true)
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.append({value: inputValue.value, color: ElementStates.Modified})
    setAddIndex(0)
    setAddNode(false)
    setArr(linkedList.toArray())
    await new Promise((resolve) => setTimeout(resolve, 500));
    linkedList.getLastAddedNode().value= {value: inputValue.value, color: ElementStates.Default}
    setArr(linkedList.toArray())
    
  }
  const handleClickDeleteHead = (e: any) => {
    linkedList.deleteHead()
    setArr(linkedList.toArray())
  }
  const handleClickDeleteTail = (e: any) => {
    linkedList.deleteTail()
    setArr(linkedList.toArray())
  }
  console.log(linkedList.getLength()- addIndex);
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
           onClick={handleClickPrepend}
          /* isLoader={loaderEnqueue} */
          text="Добавить в head"
          /* disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
           onClick={ handleClickAppend}
          /* isLoader={loaderDequeue}  */
          text="Добавить в tail"
          /*  disabled={loaderEnqueue || !!queue.isEmpty()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
           onClick={handleClickDeleteHead}
          /* isLoader={loaderEnqueue}  */
          text="Удалить из head"
          /*   disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
             onClick={handleClickDeleteTail}
          /* isLoader={loaderDequeue}  */
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
          text="Добавить по индексу"
          /* disabled={loaderDequeue || !inputValue || queue.isFullQueue()} */
          linkedList="big"
          extraClass={style.btnIndex}
        />
        <Button
          /*  onClick={handleClickDequeue}
          isLoader={loaderDequeue} */
          text="Удалить по индексу"
          /*  disabled={loaderEnqueue || !!queue.isEmpty()} */
          linkedList="big"
          extraClass={style.btnIndex}
        />
      </div>
      <ul className={style.listWrapper}>
        {arr.map((item: any, index: number) => (
          <li className={style.list} key={index}>
            {addNode && ((linkedList.getLength()- addIndex) === index) && <Circle state={ElementStates.Changing} isSmall={true} letter={inputValue.value} extraClass={style.addNodeCircle}/>}
            <Circle
            key={index}
            index={index}
            letter={item.value.value}
            state={item.value.color}
            tail={!item.next ? "tail" : ""}
            head={index === 0 && !addNode ? "head" : ""} 
          />
          {item.next && <ArrowIcon/>}
          </li>
        ))}
      </ul> 
    </SolutionLayout>
  );
};
