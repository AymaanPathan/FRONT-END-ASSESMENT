import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-foreground font-sans dark flex flex-col overflow-hidden">
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
