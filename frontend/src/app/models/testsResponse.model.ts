import { Test } from "./test.model";

export interface TestsResponseModel {
  count: number;
  results: Array<Test>;
}
