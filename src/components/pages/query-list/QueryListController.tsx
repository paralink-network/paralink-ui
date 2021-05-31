import React, { useEffect, useState } from "react"
import ErrorContainer from "../../common/sub-pages/ErrorContainer";
import Loading from "../../common/sub-pages/Loading";
import PqlLoaderHook, { Status } from "./PqlLoaderHook";
import QueryListPage from "./QueryListPage";

interface QueryListControllerProps {

}

const QueryListController = ({} : QueryListControllerProps) => {
  const {status, data, error} = PqlLoaderHook();

  switch (status) {
    case Status.Loading:
      return <Loading />;
    case Status.Error: 
      return <ErrorContainer hash="" message={error} />;
    case Status.Success:
      return <QueryListPage data={data}/>;
  }
}

export default QueryListController;