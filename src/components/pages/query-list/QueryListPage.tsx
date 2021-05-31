import React from "react"
import { PQLWithHash } from "../../../api/pql";
import QueryItem from "./QueryItem";

interface QueryListPageProps {
  data: PQLWithHash[];
}

const QueryListPage = ({data} : QueryListPageProps) => {
  const queriesView = data
    .map((pql, index) =>
      <QueryItem hash={pql.hash} name={pql.pql.name} key={index}/>);

  return (
    <div>
      <div>
        Local PQL Queries:
      </div>
      <div className="">
        {queriesView}
        <div>
          <div>+</div>
          <span>Add new PQL</span>
        </div>
      </div>
    </div>
  );
}

export default QueryListPage;