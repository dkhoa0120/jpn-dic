import DailyDetailCtn from "@/containers/daily/DailyDetailCtn";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="pb-[10px] md:pb-0">
      <DailyDetailCtn id={id} />
    </div>
  );
}
