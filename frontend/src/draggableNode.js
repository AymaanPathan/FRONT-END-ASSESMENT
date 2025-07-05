// draggableNode.js
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
    const colors = {
      customInput: "text-blue-400",
      llm: "text-purple-400",
      customOutput: "text-green-400",
      text: "text-yellow-400",
      email: "text-red-400",
      api_call: "text-cyan-400",
      if_condition: "text-orange-400",
      delay: "text-indigo-400",
      slack: "text-pink-400",
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
      <div className="min-w-[80px] h-[60px] flex items-center justify-center flex-col rounded-lg bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-colors p-3">
        <Icon className={`h-4 w-4 mb-1 ${getNodeColor(type)}`} />
        <span className="text-white text-xs text-center">{label}</span>
      </div>
    </div>
  );
};
