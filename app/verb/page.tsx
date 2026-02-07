import { fetchAllVerbs } from "@/api/verb";
import VerbCtn from "@/containers/verb/VerbCtn";

export const metadata = {
  title: "Động từ tiếng Nhật | Japanese Verbs",
  description: "Danh sách động từ tiếng Nhật theo nhóm",
};

export const page = async () => {
  const data = await fetchAllVerbs();
  return (
    <div className="pb-[10px] md:pb-0">
      <VerbCtn initialData={data} />
    </div>
  );
};

export default page;
