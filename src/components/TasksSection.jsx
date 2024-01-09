import { useDrop } from "react-dnd";
import { Header } from "./Header";
import { Task } from "./Task";
import toast from "react-hot-toast";

export const TasksSection = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  done,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    setTasks((prevTasks) => {
      const modifyTasks = prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });

      localStorage.setItem("tasks", JSON.stringify(modifyTasks));

      toast("Task status changed succesfully", {icon:"💡"})

      return modifyTasks;
    });
  };

  let text = "to-do";
  let bg = "bg-red-500";
  let tasksToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-blue-500";
    tasksToMap = inProgress;
  }

  if (status === "done") {
    text = "Done";
    bg = "bg-green-500";
    tasksToMap = done;
  }
  return (
    <div
      ref={drop}
      className={`w-64 rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
    >
      <Header text={text} bg={bg} count={tasksToMap.length} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};
