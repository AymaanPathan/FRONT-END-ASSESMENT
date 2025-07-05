import { UniversalNode } from "../UniversalNode/UniversalNode.jsx";
import { SLACK_MESSAGE_NODE_CONFIG } from "./SLACK_MESSAGE_NODE_CONFIG.js";

export const SlackMessageNode = (props) => (
  <UniversalNode {...props} nodeConfig={SLACK_MESSAGE_NODE_CONFIG} />
);
