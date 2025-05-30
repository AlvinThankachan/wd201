// const todoList = require('../todo');

// const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

// const formattedDate = (d) => {
//   return d.toISOString().split('T')[0];
// };

// describe('Todolist test suite', () => {
//   beforeAll(() => {
//     add({
//       title: 'todo',
//       completed: false,
//       dueDate: new Date().toLocaleDateString('en-CA'),
//     });
//   });

//   test('should add new todo', () => {
//     const todoItemsCount = all.length;
//     add({
//       title: 'todo',
//       completed: false,
//       dueDate: new Date().toLocaleDateString('en-CA'),
//     });
//     expect(all.length).toBe(todoItemsCount + 1);
//   });

//   test('should mark a todo as complete', () => {
//     expect(all[0].completed).toBe(false);
//     markAsComplete(0);
//     expect(all[0].completed).toBe(true);
//   });

//   test('Should check retrieval of overdue items', () => {
//     var dateToday = new Date();

//     const yesterday = formattedDate(
//       new Date(new Date().setDate(dateToday.getDate() - 1))
//     );
//     add({
//       title: 'todo overdue',
//       completed: false,
//       dueDate: yesterday,
//     });
//     expect(overdue().some((item) => item.dueDate === yesterday)).toBe(true);
//   });

//   test('should check retrieval of due today items', () => {
//     add({
//       title: 'Today Assignment',
//       completed: false,
//       dueDate: new Date().toLocaleDateString('en-CA'),
//     });
//     var dateToday = formattedDate(new Date());
//     expect(dueToday().some((item) => item.dueDate === dateToday)).toBe(true);
//   });

//   test('should check retrieval of due Later items', () => {
//     var dateToday = new Date();
//     const tomorrow = formattedDate(
//       new Date(new Date().setDate(dateToday.getDate() + 1))
//     );
//     add({
//       title: 'todo DueDatae',
//       completed: false,
//       dueDate: tomorrow,
//     });
//     expect(dueLater().some((item) => item.dueDate === tomorrow)).toBe(true);
//   });
// });

const todoList = require('../todo');

describe('Todolist test suite', () => {
  let todos;

  beforeEach(() => {
    // Create a fresh todoList instance for each test
    todos = todoList();
  });

  const formattedDate = (d) => {
    return d.toISOString().split('T')[0];
  };

  test('should add new todo', () => {
    const initialCount = todos.all.length;

    todos.add({
      title: 'Test todo item',
      completed: false,
      dueDate: formattedDate(new Date()),
    });

    expect(todos.all.length).toBe(initialCount + 1);
    expect(todos.all[0].title).toBe('Test todo item');
    expect(todos.all[0].completed).toBe(false);
  });

  test('should mark a todo as complete', () => {
    // First add a todo item
    todos.add({
      title: 'Todo to complete',
      completed: false,
      dueDate: formattedDate(new Date()),
    });

    expect(todos.all[0].completed).toBe(false);

    todos.markAsComplete(0);

    expect(todos.all[0].completed).toBe(true);
  });

  test('should retrieve overdue items', () => {
    const dateToday = new Date();
    const yesterday = formattedDate(
      new Date(new Date().setDate(dateToday.getDate() - 1))
    );

    // Add an overdue item
    todos.add({
      title: 'Overdue todo',
      completed: false,
      dueDate: yesterday,
    });

    // Add a current item for comparison
    todos.add({
      title: 'Current todo',
      completed: false,
      dueDate: formattedDate(new Date()),
    });

    const overdueItems = todos.overdue();

    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe('Overdue todo');
    expect(overdueItems[0].dueDate).toBe(yesterday);
  });

  test('should retrieve due today items', () => {
    const today = formattedDate(new Date());
    const dateToday = new Date();
    const tomorrow = formattedDate(
      new Date(new Date().setDate(dateToday.getDate() + 1))
    );

    // Add a today item
    todos.add({
      title: "Today's assignment",
      completed: false,
      dueDate: today,
    });

    // Add a future item for comparison
    todos.add({
      title: 'Future todo',
      completed: false,
      dueDate: tomorrow,
    });

    const todayItems = todos.dueToday();

    expect(todayItems.length).toBe(1);
    expect(todayItems[0].title).toBe("Today's assignment");
    expect(todayItems[0].dueDate).toBe(today);
  });

  test('should retrieve due later items', () => {
    const dateToday = new Date();
    const today = formattedDate(new Date());
    const tomorrow = formattedDate(
      new Date(new Date().setDate(dateToday.getDate() + 1))
    );

    // Add a future item
    todos.add({
      title: 'Future assignment',
      completed: false,
      dueDate: tomorrow,
    });

    // Add a current item for comparison
    todos.add({
      title: 'Current todo',
      completed: false,
      dueDate: today,
    });

    const laterItems = todos.dueLater();

    expect(laterItems.length).toBe(1);
    expect(laterItems[0].title).toBe('Future assignment');
    expect(laterItems[0].dueDate).toBe(tomorrow);
  });
});
