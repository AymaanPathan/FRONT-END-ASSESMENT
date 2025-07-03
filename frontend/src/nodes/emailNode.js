import { UniversalNode } from "./UniversalNode";
import { EMAIL_NODE_CONFIG } from "../nodes_configs/EMAIL_NODE_CONFIG.js";
export const EmailNode = (props) => (
  <UniversalNode {...props} nodeConfig={EMAIL_NODE_CONFIG} />
);
