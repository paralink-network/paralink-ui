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
    <div className="container mx-auto mt-3">
      <h3 className="text-3xl">
        Local PQL Queries:
      </h3>
      <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
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