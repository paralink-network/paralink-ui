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

        for (let index in hashes) {
          try {
            pql.push(await loadIPFSWithHash(hashes[index]));
          } catch (e) { }
        }

        setData(pql);
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