import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function handleCreateNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("/habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);

    alert("Hábito criado com sucesso!");
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      setWeekDays((old) => old.filter((day) => day !== weekDay));
    } else {
      setWeekDays((old) => [...old, weekDay]);
    }
  }

  return (
    <form onSubmit={handleCreateNewHabit} className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu compromentimento?
      </label>

      <input
        type="text"
        id="title"
        placeholder="Ex.: Exercícios, dormir bem, etc.."
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-4 rounded-lg mt-3 bg-zinc-800 text-white focus:outline focus:outline-1 focus:outline-zinc-700 placeholder:text-zinc-400"
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>

      <div className="flex flex-col gap-2 mt-3">
        {availableWeekDays.map((weekDay, index) => (
          <Checkbox.Root
            key={weekDay}
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
            className="flex items-center gap-3 group"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" weight="bold" />
              </Checkbox.Indicator>
            </div>

            <label className="text-white leading-tight">{weekDay}</label>
          </Checkbox.Root>
        ))}
      </div>

      <button
        type="submit"
        className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:brightness-110 transition-all"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
