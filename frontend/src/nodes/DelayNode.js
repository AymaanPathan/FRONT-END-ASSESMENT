import { UniversalNode } from "./UniversalNode";
import { DELAY_NODE_CONFIG } from "../nodes_configs/DELAY_NODE_CONFIG.js";

export const DelayNode = (props) => (
  <UniversalNode {...props} nodeConfig={DELAY_NODE_CONFIG} />
);
