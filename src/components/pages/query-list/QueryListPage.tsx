import React from "react"
import { useHistory } from "react-router-dom";
import { PQLWithHash } from "../../../api/pql";
import { HoverCard } from "../../common/Card";
import QueryItem from "./QueryItem";
import { Icon, InlineIcon } from '@iconify/react';
import plusIcon from '@iconify-icons/mdi/plus';

interface QueryListPageProps {
  data: PQLWithHash[];
}

const AddNewPql = () => {
  const history = useHistory();
  const open = () => history.push("query-builder/new");
  return (
    <HoverCard onClick={open}>
      <Icon className="mx-auto" icon={plusIcon} width="30" height="30" />
      <div className="text-center">
        Add new PQL
      </div>
    </HoverCard>
  );
};

const QueryListPage = ({data} : QueryListPageProps) => {
  const queriesView = data
    .map((pql, index) =>
      <QueryItem hash={pql.hash} name={pql.pql.name} key={index}/>);

  return (
    <div className="container mx-auto mt-3">
      <h3 className="text-3xl">
        Local PQL Queries:
      </h3>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
        {queriesView}
        <AddNewPql />
      </div>
    </div>
  );
}

export default QueryListPage;