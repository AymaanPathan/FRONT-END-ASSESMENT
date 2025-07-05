import { UniversalNode } from "../UniversalNode/UniversalNode.jsx";
import { DELAY_NODE_CONFIG } from "./DELAY_NODE_CONFIG.js";

export const DelayNode = (props) => (
  <UniversalNode {...props} nodeConfig={DELAY_NODE_CONFIG} />
);
