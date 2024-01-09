import { useEffect, useState } from "react";
import { TasksSection } from "./TasksSection";

export const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (tasks) {
      const filterTodos = tasks.filter((task) => task.status === "todo");
      const filterInProgress = tasks.filter(
        (task) => task.status === "inprogress"
      );
      const filterDone = tasks.filter((task) => task.status === "done");

      setTodos(filterTodos);
      setInProgress(filterInProgress);
      setDone(filterDone);
    }
  }, [tasks]);

  const statuses = ["todo", "inprogress", "done"];

  return (
    <div className="flex gap-16">
      {statuses.map((status, index) => (
        <TasksSection
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          done={done}
        />
      ))}{" "}
    </div>
  );
};
