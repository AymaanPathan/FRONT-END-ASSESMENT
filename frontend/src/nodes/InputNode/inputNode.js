import { UniversalNode } from "../UniversalNode/UniversalNode";
import { INPUT_NODE_CONFIG } from "./INPUT_NODE_CONFIG";
export const InputNode = ({ props }) => (
  <UniversalNode {...props} nodeConfig={INPUT_NODE_CONFIG} />
);
