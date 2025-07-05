import { UniversalNode } from "../UniversalNode/UniversalNode";
import { EMAIL_NODE_CONFIG } from "./EMAIL_NODE_CONFIG.js";
export const EmailNode = (props) => (
  <UniversalNode {...props} nodeConfig={EMAIL_NODE_CONFIG} />
);
