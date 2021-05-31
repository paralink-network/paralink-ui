import React from "react"
import { useHistory } from "react-router-dom";
import { Card, HoverCard } from "../../common/Card";

interface QueryItemProps {
  hash: string;
  name: string;
}

const QueryItem = ({hash, name} : QueryItemProps) => {
  const history = useHistory();

  const open = () => history.push(`query-builder/${hash}`);

  return (
    <HoverCard onClick={open}>
      <div className="text-lg truncate font-bold">{name ? name : ""}</div>
      <div className="truncate">{hash}</div>
    </HoverCard>
  );
}

export default QueryItem;