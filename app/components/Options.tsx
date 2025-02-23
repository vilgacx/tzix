"use client"

import { ChangeEventHandler } from "react";
import useOptionsStore from "../store/options.store";

export default function Options() {
  const { add, mass, toggle_add, set_mass } = useOptionsStore();

  return (
    <div className="h-full w-72 flex flex-col relative">
      <div className="absolute com w-full overflow-y-auto flex flex-col p-5 gap-8">
        <div className="option-main">
          <p className="option-title">ball</p>
          <ToggleBtn
            name="add_ball"
            checked={add}
            fn={toggle_add}
          />
          <Input
            name="mass"
            type="number"
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
  type: string;
}
export function ToggleBtn(props: ToggleBtnProps) {
  return (
    <div className="option-div pad justify-between items-center">
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
    <div className="option-div divide-x-2">
      <p className="pad">
        {props.name.split("_").join(" ").toUpperCase()}
      </p>
      <input
        type={props.type}
        defaultValue={props.defaultValue}
        placeholder={props.name}
        className="pad w-full bg-transparent outline-none"
        onChange={props.fn}
      />
    </div>
  )
}