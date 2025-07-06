import { UniversalNode } from "../UniversalNode/UniversalNode";
import { TEXT_NODE_CONFIG } from "./TEXT_NODE_CONFIG";
export const TextNode = ({ props }) => (
  <UniversalNode {...props} nodeConfig={TEXT_NODE_CONFIG} />
);
