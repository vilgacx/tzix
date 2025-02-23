import { ChangeEventHandler } from "react";
import useOptionsStore from "../store/options.store";

export default function Options() {
  const { add, mass, toggle_add, set_mass } = useOptionsStore();

  return (
    <div className="h-full w-64 flex flex-col relative">
      <div className="absolute com w-full divide-y-2 overflow-y-auto flex flex-col p-5 gap-2">

        <div className="flex flex-col gap-4 border-2 rounded p-3">
          <ToggleBtn
            name="add_ball"
            checked={add}
            fn={toggle_add}
          />
          <Input
            name="mass"
            defaultValue={mass.toString()}
            fn={(e) => set_mass(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  )
}

type InputProps = {
  name: string,
  fn: ChangeEventHandler<any>
}

interface ToggleBtnProps extends InputProps {
  checked: boolean,
}

interface TextInputProps extends InputProps {
  defaultValue: string;
}

export function ToggleBtn(props: ToggleBtnProps) {
  return (
    <div className="opt-div">
      <p>{props.name.split("_").join(" ").toUpperCase()}</p>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            name={props.name}
            checked={props.checked}
            onChange={props.fn}
            className="sr-only"
          />
          <div className={`box block border-com h-6 w-10 rounded-sm ${!!props.checked ? "bg-purple-700" : "bg-neutral-800"}`}></div>
          <div className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-white transition ${!!props.checked ? "translate-x-full" : ""}`}></div>
        </div>
      </label>
    </div>
  )
}

export function Input(props: TextInputProps) {
  return (
    <div className="opt-div">
      <input
        type="text"
        defaultValue={props.defaultValue}
        placeholder={props.name}
        className="border-com w-full rounded-sm bg-transparent p-2 text-sm text-white outline-none"
        onChange={props.fn}
      />
    </div>
  )
}