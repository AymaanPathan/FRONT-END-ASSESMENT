import { UniversalNode } from "./UniversalNode";
import { API_CALL_NODE_CONFIG } from "../nodes_configs/API_CALL_NODE_CONFIG";
export const APICallNode = (props) => (
  <UniversalNode {...props} nodeConfig={API_CALL_NODE_CONFIG} />
);
