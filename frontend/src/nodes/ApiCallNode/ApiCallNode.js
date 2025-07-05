import { UniversalNode } from "../UniversalNode/UniversalNode";
import { API_CALL_NODE_CONFIG } from "./API_CALL_NODE_CONFIG";
export const APICallNode = (props) => (
  <UniversalNode {...props} nodeConfig={API_CALL_NODE_CONFIG} />
);
