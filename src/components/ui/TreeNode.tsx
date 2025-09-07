import { Component } from 'solid-js';

interface TreeNodeProps {
  class?: string;
}

const TreeNode: Component<TreeNodeProps> = props => (
  <svg width="70" height="50" class={props.class}>
    <line x1="30" y1="25" x2="60" y2="25" stroke="current" stroke-width="3" />
    <line x1="30" y1="0" x2="30" y2="50" stroke="current" stroke-width="3" />
  </svg>
);

export default TreeNode;
