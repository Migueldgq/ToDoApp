import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

export const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  const handleRemove = (id) => {
    console.log(id);

    const filterTasks = tasks.filter((task) => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(filterTasks));

    setTasks(filterTasks);

    toast("Task removed", { icon: "👋" });
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-8 shadow-md rounded-md cursor-grabbing ${
        isDragging ? "opacity-15" : "opacity-100"
      }`}
    >
      <p>{task.name}</p>
      <button
        className="absolute bottom-1 right-1 text-slate-500"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};
