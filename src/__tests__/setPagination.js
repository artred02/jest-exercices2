import { setPagination } from "../setPagination";

describe("setPagination", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return default pagination values if no parameters are provided", () => {
    const pagination = setPagination({});
    expect(pagination).toEqual({
      total: 1,
      numberItems: 1,
      numberPages: 1,
      currentPage: 1,
    });
  });

  test("should convert total to a number", () => {
    const pagination = setPagination({ total: "100" });
    expect(pagination.total).toBe(100);
  });

  test("should convert max to a number", () => {
    const pagination = setPagination({ max: "10" });
    expect(pagination.numberItems).toBe(10);
  });

  test("should handle setCurrentPageFn and setNumberPagesFn as default functions", () => {
    const setCurrentPageFn = jest.fn().mockReturnValue(2);
    const setNumberPagesFn = jest.fn().mockReturnValue(9);

    const pagination = setPagination({
      total: 100,
      skip: 20,
      max: 10,
      setCurrentPageFn,
      setNumberPagesFn,
    });
    expect(pagination).toMatchObject({
      total: 100,
      numberItems: 10,
      numberPages: 9,
      currentPage: 2,
    });
  });
});
