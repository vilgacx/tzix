import Scene from "./components/scene";

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col p-4 bg-neutral-800">
      <p className="py-4 px-1 text-white text-center">
        <b>tzix</b> [a tiny physics engine written in typescript] [by <a target="_blank" href="https://github.com/vilgacx"><u>vilgacx</u></a>]
      </p>
      <Scene />
    </main>
  );
}