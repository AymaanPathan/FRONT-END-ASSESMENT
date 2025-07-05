export const ErrorContent = ({ result }) => {
  console.log("ErrorContent result:", result);
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-sm font-medium text-foreground">
            Analysis Failed
          </span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          Unable to analyze your pipeline. Please check the details below.
        </p>
        <div className="bg-muted/50 rounded-lg p-3">
          <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
            {result}
          </pre>
        </div>
      </div>
    </div>
  );
};
