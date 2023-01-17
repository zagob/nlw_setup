interface HabitProps {
  completed: number;
}

export function Habit({ completed }: HabitProps) {
  return <div className="w-10 h-10 rounded bg-purple-700 m-2"></div>;
}
