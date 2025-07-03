import { UniversalNode } from "./UniversalNode";
import { SLACK_MESSAGE_NODE_CONFIG } from "../nodes_configs/SLACK_MESSAGE_NODE_CONFIG.js";

export const SlackMessageNode = (props) => (
  <UniversalNode {...props} nodeConfig={SLACK_MESSAGE_NODE_CONFIG} />
);
