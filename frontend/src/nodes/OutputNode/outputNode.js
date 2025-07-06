import { UniversalNode } from "../UniversalNode/UniversalNode";
import { OUTPUT_NODE_CONFIG } from "./OUTPUT_NODE_CONFIG";
export const OutputNode = ({ props }) => (
  <UniversalNode {...props} nodeConfig={OUTPUT_NODE_CONFIG} />
);
