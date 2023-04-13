import { ElementStates } from "../../types/element-states";

// !РАНДОМАЙЗЕР вынести в общие
function getRandomInteger(min: number, max: number) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}
export function getRandomArray(min: number, max: number) {
  let arr = [];
  for (let i = 0; i <= getRandomInteger(min, max); i++)
    arr.push({
      value: Math.floor(Math.random() * 100),
      color: ElementStates.Default,
    });
  return arr;
}

// СОРТИРОВКА ВЫБОРОМ
export const selectionSort = async (arr: any, setArr: any, setLoader: any, sortUp = true) => {
  setLoader(true)
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].color = ElementStates.Changing;
      arr[j].color = ElementStates.Changing;
      setArr([...arr]);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (
        sortUp
          ? arr[j].value > arr[minIndex].value
          : arr[j].value < arr[minIndex].value
      ) {
        minIndex = j;
      }
      arr[j].color = ElementStates.Default;
      setArr([...arr]);
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    arr[i].color = ElementStates.Modified;
  }
  arr[arr.length - 1].color = ElementStates.Modified;
  setArr([...arr]);
  setLoader(false)
};

// СОРТИРОВКА ПУЗЫРЬКОМ
export const bubbleSort = async (arr: any, setArr: any, setLoader: any, sortUp = true) => {
  setLoader(true)
  setArr([...arr]);
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      arr[j].color = ElementStates.Changing;
      arr[j + 1].color = ElementStates.Changing;
      await new Promise((resolve) => setTimeout(resolve, 500));
      setArr([...arr]);
      
      if (
        sortUp
          ? arr[j].value < arr[j + 1].value
          : arr[j].value > arr[j + 1].value
      ) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
       arr[j].color = ElementStates.Default; 
    }
    arr[arr.length - i - 1].color = ElementStates.Modified;
    setArr([...arr]);
  }
  setLoader(false)
};
