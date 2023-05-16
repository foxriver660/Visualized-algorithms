import { expandString, stringToArr } from "./utils";

describe("StringFunc", () => {
  const setterValue = jest.fn();
  const setterLoader = jest.fn();
  test("с чётным количеством символов", async () => {
    const inputValue = "test";
    const outputValue = "tset";
    const result = await expandString(
      stringToArr(inputValue, false),
      setterValue,
      setterLoader
    );
    expect(result).toEqual(stringToArr(outputValue, true));
  });
  test("с нечетным количеством символов", async () => {
    const inputValue = "oddtest";
    const outputValue = "tsetddo";
    const result = await expandString(
      stringToArr(inputValue, false),
      setterValue,
      setterLoader
    );
    expect(result).toEqual(stringToArr(outputValue, true));
  });
  test("с одним символом", async () => {
    const inputValue = "t";
    const outputValue = "t";
    const result = await expandString(
      stringToArr(inputValue, false),
      setterValue,
      setterLoader
    );
    expect(result).toEqual(stringToArr(outputValue, true));
  });
  test("пустую строку", async () => {
    const inputValue = "";
    const outputValue = "";
    const result = await expandString(
      stringToArr(inputValue, false),
      setterValue,
      setterLoader
    );
    expect(result).toEqual(stringToArr(outputValue, true));
  });
});
