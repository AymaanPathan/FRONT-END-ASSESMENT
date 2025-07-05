import { Network } from "lucide-react";
import { BarChart3 } from "lucide-react";
import { GitBranch } from "lucide-react";

export const SuccessContent = ({ result }) => {
  return (
    <div className="space-y-4">
      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Nodes
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {result?.num_nodes}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <GitBranch className="h-4 w-4 text-purple-500" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              Edges
            </span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {result?.num_edges}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                result?.is_dag ? "bg-green-500/10" : "bg-red-500/10"
              }`}
            >
              <Network
                className={`h-4 w-4 ${
                  result?.is_dag ? "text-green-500" : "text-red-500"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-muted-foreground">
              DAG
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              result?.is_dag ? "text-green-500" : "text-red-500"
            }`}
          >
            {result?.is_dag ? "Valid" : "Invalid"}
          </p>
        </div>
      </div>

      {/* Status Card */}
      <div
        className={`p-4 rounded-lg border ${
          result?.is_dag
            ? "bg-green-500/5 border-green-500/20"
            : "bg-red-500/5 border-red-500/20"
        }`}
      >
        <div className="flex items-center space-x-2 mb-2">
          <div
            className={`w-2 h-2 rounded-full ${
              result?.is_dag ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="text-sm font-medium text-foreground">
            {result?.is_dag ? "Pipeline Structure Valid" : "Cycle Detected"}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          {result?.is_dag
            ? "Your pipeline forms a valid directed acyclic graph and can be executed."
            : "Your pipeline contains circular dependencies. Please review the connections between nodes."}
        </p>
      </div>

      {/* Technical Details */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">
          Technical Details
        </h4>
        <div className="bg-muted/50 rounded-lg p-3">
          <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
            {`num_nodes:${result?.num_nodes} , num_edges:${result?.num_edges} , and is_dag:${result?.is_dag}`}
          </pre>
        </div>
      </div>
    </div>
  );
};
