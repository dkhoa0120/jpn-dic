import { dailyApi } from "@/api/dailies";

import DailyEditor from "./DailyEditor";

type Props = {
  id: string;
};

export default async function DailyDetailCtn({ id }: Props) {
  const daily = await dailyApi.getDaily(id);

  return (
    <div>
      <DailyEditor daily={daily.data} />
    </div>
  );
}
