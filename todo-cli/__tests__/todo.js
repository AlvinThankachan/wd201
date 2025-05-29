const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

describe("Todolist test suite", () => {
  beforeAll(() => {
    add({
      title: "todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should check retrieval of overdue items", () => {
    var dateToday = new Date();

    const yesterday = formattedDate(
      new Date(new Date().setDate(dateToday.getDate() - 1)),
    );
    add({
      title: "todo overdue",
      completed: false,
      dueDate: yesterday,
    });
    expect(overdue().some((item) => item.dueDate === yesterday)).toBe(true);
  });

  test("should check retrieval of due todayitems", () => {
    add({
      title: "Today Assignment",
      completed: false,
      dueDate: formattedDate(new Date()),
    });
    var dateToday = formattedDate(new Date());
    expect(dueToday().some((item) => item.dueDate === dateToday)).toBe(true);
  });

  test("should check retrieval of due Later items", () => {
    var dateToday = new Date();
    const tomorrow = formattedDate(
      new Date(new Date().setDate(dateToday.getDate() + 1)),
    );
    add({
      title: "todo DueDatae",
      completed: false,
      dueDate: tomorrow,
    });
    expect(dueLater().some((item) => item.dueDate === tomorrow)).toBe(true);
  });
});
