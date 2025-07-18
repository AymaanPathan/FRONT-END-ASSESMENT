import { UniversalNode } from "../UniversalNode/UniversalNode";
import { LLM_NODE_CONFIG } from "./LLM_Node_CONFIG";
export const LLMNode = ({ props }) => (
  <UniversalNode {...props} nodeConfig={LLM_NODE_CONFIG} />
);
