import React from "react"

interface QueryItemProps {
  hash: string;
  name: string;
}

const QueryItem = ({hash, name} : QueryItemProps) => (
  <div>
    <div>{name}</div>
    <div>{hash}</div>
  </div>
);

export default QueryItem;