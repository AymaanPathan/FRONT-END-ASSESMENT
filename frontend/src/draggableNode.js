import { useTheme } from "next-themes";
import {
  Database,
  Zap,
  Layers,
  Edit3,
  Mail,
  GitBranch,
  Clock,
  MessageSquare,
} from "lucide-react";
export const DraggableNode = ({ type, label }) => {
  const { resolvedTheme } = useTheme();

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  const getNodeIcon = (type) => {
    const icons = {
      customInput: Database,
      llm: Zap,
      customOutput: Layers,
      text: Edit3,
      email: Mail,
      api_call: GitBranch,
      if_condition: GitBranch,
      delay: Clock,
      slack: MessageSquare,
    };
    return icons[type];
  };

  const getNodeColor = (type) => {
    const isDark = resolvedTheme === "dark";
    const colors = {
      customInput: isDark ? "text-blue-400" : "text-blue-600",
      llm: isDark ? "text-purple-400" : "text-purple-600",
      customOutput: isDark ? "text-green-400" : "text-green-600",
      text: isDark ? "text-yellow-400" : "text-yellow-600",
      email: isDark ? "text-red-400" : "text-red-600",
      api_call: isDark ? "text-cyan-400" : "text-cyan-600",
      if_condition: isDark ? "text-orange-400" : "text-orange-600",
      delay: isDark ? "text-indigo-400" : "text-indigo-600",
      slack: isDark ? "text-pink-400" : "text-pink-600",
    };
    return colors[type];
  };

  const Icon = getNodeIcon(type);

  return (
    <div
      className={`${type} group cursor-grab active:cursor-grabbing transition-all duration-200 hover:scale-105`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      <div className="min-w-[80px] h-[60px] flex items-center justify-center flex-col rounded-lg border hover:border-gray-600 transition-colors p-3">
        <Icon className={`h-4 w-4 mb-1 ${getNodeColor(type)}`} />
        <span className="text-xs text-center text-foreground">{label}</span>
      </div>
    </div>
  );
};
