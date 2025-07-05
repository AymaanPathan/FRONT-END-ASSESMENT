import { useState } from "react";
import { useStore } from "./store";
import { Button } from "./components/ui/button";
import { BarChart3 } from "lucide-react";
import { ResultModal } from "./components/result/ResultModal";

export const SubmitButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const submitPipeline = useStore((state) => state.submitPipeline);
  const isSubmitting = useStore((state) => state.isSubmitting);

  const handleSubmit = async () => {
    try {
      const resultMessage = await submitPipeline();
      setResult(resultMessage);
      setIsSuccess(true);
      setModalOpen(true);
    } catch (error) {
      setResult(error.message || "An error occurred");
      setIsSuccess(false);
      setModalOpen(true);
    }
  };

  return (
    <>
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
            Analyzing...
          </>
        ) : (
          <>
            <BarChart3 className="w-4 h-4 mr-2" />
            Submit Pipeline
          </>
        )}
      </Button>

      <ResultModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        result={result}
        isSuccess={isSuccess}
      />
    </>
  );
};
