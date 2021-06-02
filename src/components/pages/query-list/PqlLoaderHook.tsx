import React, { useEffect, useState } from "react"
import { loadIPFSWithHash, loadLocalIpfsHashes, PQLWithHash } from "../../../api/pql";

export enum Status {
  Loading,
  Error,
  Success
}

interface PqlLoaderHook {
  status: Status;
  data: PQLWithHash[];
  error: string;
}

const compare = (s1: PQLWithHash, s2: PQLWithHash) => {
  if (s1.pql.name < s2.pql.name) {
    return -1
  } else if (s1.pql.name > s2.pql.name) {
    return 1;
  } else {
    return 0;
  }
}

const PqlLoaderHook = (): PqlLoaderHook => {
  const [data, setData] = useState<PQLWithHash[]>([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>(Status.Success);

  useEffect(() => {
    const loader = async () => {
      try {
        setStatus(Status.Loading);
        const {hashes} = await loadLocalIpfsHashes();

        let pql: PQLWithHash[] = [];

        for (let index=0; index < hashes.length; index++) {
          try {
            pql.push(await loadIPFSWithHash(hashes[index]));
          } catch (e) { }
        }

        const orderedPqls = pql
        .filter((item) => item.pql.name !== undefined)
        .sort(compare)

        setData(orderedPqls);
        setStatus(Status.Success);
      } catch (e) {
        console.error(e);
        setError(e.message);
        setStatus(Status.Error);
      } 
    }
    loader();
  }, [])

  return {data, status, error};
}

export default PqlLoaderHook;