import { useRef } from "react";

const TEXT = "CYBERPUNK";
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function App() {
  const intervalRef = useRef<any>(null);

  const onMouseEnter = (e: React.SyntheticEvent) => {
    if (intervalRef.current) return;
    let iterations = 0;

    const interval = setInterval(() => {
      const el = e.target as HTMLHeadingElement;
      el.innerText = el.innerText
        .split("")
        .map((_, index) => {
          if (index < iterations) {
            return el.dataset.value?.charAt(index) ?? "";
          }
          return LETTERS[Math.floor(Math.random() * 26)];
        })
        .join("");

      iterations += 1 / 3;

      if (iterations > (el.dataset.value?.length ?? 20)) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 30);

    intervalRef.current = interval;
  };

  return (
    <main className="w-screen h-screen flex flex-col gap-10 justify-center items-center">
      <p className="text-xl underline underline-offset-4">
        Hover Over 👇🏻 To See Cool Effect
      </p>
      <h1
        className="text-[100px] font-orbitron font-bold"
        onMouseEnter={(e) => onMouseEnter(e)}
        data-value={TEXT}
      >
        {TEXT}
      </h1>
    </main>
  );
}

export default App;
