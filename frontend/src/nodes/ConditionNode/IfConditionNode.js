import { UniversalNode } from "../UniversalNode/UniversalNode";
import { IF_CONDITION_NODE_CONFIG } from "./IF_CONDITION_NODE_CONFIG.js";

export const IfConditionNode = (props) => (
  <UniversalNode {...props} nodeConfig={IF_CONDITION_NODE_CONFIG} />
);
