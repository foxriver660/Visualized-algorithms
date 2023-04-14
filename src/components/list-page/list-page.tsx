import React, { useState } from "react";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ButtonName } from "../../types/buttons-name";
import { ElementStates } from "../../types/element-states";
import { timeOut} from "../../utils/delay";
import { getRandomArray } from "../sorting-page/utils";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./class";
import style from "./list-page.module.css";

const emptyInput = { value: "", index: "" };

export const ListPage: React.FC = () => {
  const [addNode, setAddNode] = useState(false);
  const [deleteNode, setDeleteNode] = useState(false);
  const [deleteNodeValue, setDeleteNodeValue] = useState("");
  const [addIndex, setAddIndex] = useState<any>(null);
  const [inputValue, setInputValue] = useState<any>(emptyInput);
  const [loader, setLoader] = useState(false);
  const [btnName, setBtnName] = useState("");
  const [linkedList] = useState<any>(new LinkedList(getRandomArray(3, 3)));
  const [arr, setArr] = useState<any>(linkedList.toArray());
  const handleChange = (e: any) =>
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  // !ДОБАВИТЬ В HEAD
  const handleClickPrepend = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.AddHead);
    setAddNode(true);
    setAddIndex(linkedList.getLength());
    setArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.prepend({
      value: inputValue.value,
      color: ElementStates.Modified,
    });

    setAddNode(false);
    setArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode().value = {
      value: inputValue.value,
      color: ElementStates.Default,
    };
    setArr(linkedList.toArray());
    setInputValue(emptyInput);
    setLoader(false);
  };

  // !ДОБАВИТЬ В TAIL
  const handleClickAppend = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.AddTail);
    setAddNode(true);
    setAddIndex(1);
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.append({
      value: inputValue.value,
      color: ElementStates.Modified,
    });

    setAddNode(false);
    setArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.getLastAddedNode().value = {
      value: inputValue.value,
      color: ElementStates.Default,
    };
    setArr(linkedList.toArray());
    setInputValue(emptyInput);
    setLoader(false);
  };
  // !УДАЛИТЬ HEAD
  const handleClickDeleteHead = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.DeleteHead);
    setDeleteNode(true);
    setDeleteNodeValue(linkedList.findByIndex(0).value);
    setAddIndex(linkedList.getLength());
    linkedList.findByIndex(0).value = "";
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.deleteHead();
    setArr(linkedList.toArray());
    setDeleteNode(false);
    setLoader(false);
  };
  // !УДАЛИТЬ TAIL
  const handleClickDeleteTail = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.DeleteTail);
    setDeleteNode(true);
    setDeleteNodeValue(
      linkedList.findByIndex(linkedList.getLength() - 1).value
    );
    setAddIndex(1);
    linkedList.findByIndex(linkedList.getLength() - 1).value = "";
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList.deleteTail();
    setArr(linkedList.toArray());
    setDeleteNode(false);
    setLoader(false);
  };

  // !ДОБАВИТЬ ПО ИНДЕКСУ
  const handleClickInsertByIndex = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.AddByIndex);
    setAddNode(true);
    for (let i = 0; i <= inputValue.index; i++) {
      setAddIndex(linkedList.getLength() - i);
      if (i < inputValue.index) {
        linkedList.findByIndex(i).color = ElementStates.Changing;
      }
      setArr(linkedList.toArray());
      await timeOut(SHORT_DELAY_IN_MS);
    }
    setAddNode(false);
    linkedList.insertAt(inputValue.index, {
      value: inputValue.value,
      color: ElementStates.Modified,
    });
    setArr(linkedList.toArray());
    await timeOut(SHORT_DELAY_IN_MS);
    linkedList
      .toArray()
      .forEach((item: any) => (item.value.color = ElementStates.Default));
    setArr(linkedList.toArray());
    setInputValue(emptyInput);
    setLoader(false);
  };

  // !УДАЛИТЬ ПО ИНДЕКСУ
  const handleClickDeleteByIndex = async (e: any) => {
    setLoader(true);
    setBtnName(ButtonName.DeleteByIndex);
    for (let i = 0; i <= inputValue.index; i++) {
      if (i < inputValue.index) {
        linkedList.findByIndex(i).color = ElementStates.Changing;
      }
      setArr(linkedList.toArray());
      await timeOut(SHORT_DELAY_IN_MS);
    }
    setDeleteNodeValue(linkedList.findByIndex(inputValue.index).value);
    setDeleteNode(true);
    setAddIndex(linkedList.getLength() - inputValue.index);
    linkedList.findByIndex(inputValue.index).value = "";
    setArr(linkedList.toArray());

    await timeOut(SHORT_DELAY_IN_MS);
    setDeleteNode(false);
    linkedList.removeAt(inputValue.index);
    setArr(linkedList.toArray());
    linkedList
      .toArray()
      .forEach((item: any) => (item.value.color = ElementStates.Default));
    setArr(linkedList.toArray());
    setInputValue(emptyInput);
    setLoader(false);
  };

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
          isLoader={loader && btnName === ButtonName.AddHead}
          text="Добавить в head"
          disabled={!inputValue.value || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          onClick={handleClickAppend}
          isLoader={loader && btnName === ButtonName.AddTail}
          text="Добавить в tail"
          disabled={!inputValue.value || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          onClick={handleClickDeleteHead}
          isLoader={loader && btnName === ButtonName.DeleteHead}
          text="Удалить из head"
          disabled={linkedList.isEmpty() || loader}
          linkedList="big"
          extraClass={style.btn}
        />
        <Button
          onClick={handleClickDeleteTail}
          isLoader={loader && btnName === ButtonName.DeleteTail}
          text="Удалить из tail"
          disabled={linkedList.isEmpty() || loader}
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
          onClick={handleClickInsertByIndex}
          isLoader={loader && btnName === ButtonName.AddByIndex}
          text="Добавить по индексу"
          disabled={!inputValue.value || !inputValue.index || loader}
          linkedList="big"
          extraClass={style.btnIndex}
        />
        <Button
          onClick={handleClickDeleteByIndex}
          isLoader={loader && btnName === ButtonName.DeleteByIndex}
          text="Удалить по индексу"
          disabled={linkedList.isEmpty() || loader}
          linkedList="big"
          extraClass={style.btnIndex}
        />
      </div>
      <ul className={style.listWrapper}>
        {arr.map((item: any, index: number) => (
          <li className={style.list} key={index}>
            {addNode && linkedList.getLength() - addIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={inputValue.value}
                extraClass={style.addNodeCircle}
              />
            )}
            <Circle
              key={index}
              index={index}
              letter={item.value.value}
              state={item.value.color}
              tail={!item.next && !deleteNode ? "tail" : ""}
              head={index === 0 && !addNode ? "head" : ""}
            />
            {deleteNode && linkedList.getLength() - addIndex === index && (
              <Circle
                state={ElementStates.Changing}
                isSmall={true}
                letter={deleteNodeValue}
                extraClass={style.deleteNodeCircle}
              />
            )}
            {item.next && <ArrowIcon />}
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
