import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { ThemeToggle } from "./components/theme/ThemeToggle";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-foreground font-sans flex flex-col overflow-hidden">
      <div className="flex justify-end p-4">
        <ThemeToggle />
      </div>
      <PipelineToolbar />
      <div className="flex-1 relative">
        <PipelineUI />
        <div className="absolute bottom-4 right-4 z-50">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default App;
