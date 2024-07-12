import { useState } from "react";

export default function ToggleBtn({ name }: { name: string }) {
  const [Checked, SetChecked] = useState(localStorage.getItem(name) || '');

  const handleCheck = () => {
    const State = Checked ? '' : '0';
    localStorage.setItem(name, State);
    SetChecked(State);
  }

  return (
    <div className="opt-div">
      <p>{name.split("_").join(" ")}</p>
        <label className='flex cursor-pointer select-none items-center'>
          <div className='relative'>
            <input type='checkbox' checked={!!Checked} onChange={handleCheck} className='sr-only' />
            <div className={`box block border-com h-6 w-10 rounded-sm ${ !!Checked ? 'bg-purple-700' : 'bg-neutral-800' }`}></div>
            <div className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-sm bg-white transition ${!!Checked ? 'translate-x-full' : '' }`}></div>
          </div>
        </label>
      </div>

  )
}
