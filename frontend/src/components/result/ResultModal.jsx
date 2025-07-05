import { Button } from "../ui/button";
import { X, CheckCircle2, AlertTriangle } from "lucide-react";
import { SuccessContent } from "./SuccessContent";
import { ErrorContent } from "./ErrorContent";

export const ResultModal = ({ isOpen, onClose, result, isSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 animate-in fade-in-0 zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                isSuccess
                  ? "bg-green-500/10 text-green-500"
                  : "bg-red-500/10 text-red-500"
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertTriangle className="h-5 w-5" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Pipeline Analysis
              </h3>
              <p className="text-sm text-muted-foreground">
                {isSuccess
                  ? "Analysis completed successfully"
                  : "Analysis failed"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <SuccessContent result={result} />
          ) : (
            <ErrorContent result={result} />
          )}
        </div>
        <div className="flex items-center justify-between p-6 border-t border-border bg-accent/20">
          <Button onClick={onClose} className="h-8 text-xs px-3">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
