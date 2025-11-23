import { useEffect, useState } from "react";
import { InfoCard } from "../Information/InfoCard";
import { getItemData } from "../../../services/getItemData";
import { Item } from "../../types/EntityTypes";

export interface ReadOnlyItemComponentProps {
  job_id: string;
}

export function ReadOnlyItemComponent({ job_id }: ReadOnlyItemComponentProps) {
  const [itemData, setItemData] = useState<Item[]>([]);

  //Using fetchJobs function to fetch the job data
  useEffect(() => {
    getItemData().then(setItemData);
  }, []);

  return <div>{/* <InfoCard sectionLabel="Item" data={} /> */}</div>;
}
