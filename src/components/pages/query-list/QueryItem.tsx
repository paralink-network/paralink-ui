import React from "react"
import { Card, HoverCard } from "../../common/Card";

interface QueryItemProps {
  hash: string;
  name: string;
}

const QueryItem = ({hash, name} : QueryItemProps) => (
  <HoverCard>
    <div>{name}</div>
    <div>{hash}</div>
  </HoverCard>
);

export default QueryItem;