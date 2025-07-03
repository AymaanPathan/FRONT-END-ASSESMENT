import { UniversalNode } from "./UniversalNode";
import { IF_CONDITION_NODE_CONFIG } from "../nodes_configs/IF_CONDITION_NODE_CONFIG.js";

export const IfConditionNode = (props) => (
  <UniversalNode {...props} nodeConfig={IF_CONDITION_NODE_CONFIG} />
);
