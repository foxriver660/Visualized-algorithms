import { TElement } from "../../types/element";

export const swap = (arr: TElement[], i: number, j: number) =>
  ([arr[i], arr[j]] = [arr[j], arr[i]]);