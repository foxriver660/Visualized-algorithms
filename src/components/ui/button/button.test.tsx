import { render } from "@testing-library/react";
import { Button } from "./button";

describe("ButtonComponent", () => {
  test("кнопки с текстом", () => {
    render(<Button text="test" />);
  });
  test("кнопки без текста", () => {
    render(<Button />);
  });
  test("заблокированной кнопки", () => {
    render(<Button disabled={true} />);
  });
  test("кнопки с индикацией загрузки", () => {
    render(<Button isLoader={true} />);
  });
});
