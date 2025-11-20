import { useEffect, useState } from "react";
import { InfoCard } from "../Jobs/Information/InfoCard";
import { fetchItems } from "../../../api/fetchItems";
import { Item } from "../../entities/items";

export interface ReadOnlyItemComponentProps {
  job_id: string;
}

export function ReadOnlyItemComponent({ job_id }: ReadOnlyItemComponentProps) {
  const [itemData, setItemData] = useState<Item[]>([]);

  //Using fetchJobs function to fetch the job data
  useEffect(() => {
    fetchItems().then(setItemData);
  }, []);

  return <div>{/* <InfoCard sectionLabel="Item" data={} /> */}</div>;
}
