import { HydrateClient, trpc } from "@/trpc/server";
import { HomeView } from "../modules/home/ui/views/home-view";

// 이렇게 하지 않으면 prefetch하는 부분에서 빌드 에러가 발생할 수 있다.
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const { categoryId } = await searchParams;
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <HomeView categoryId={categoryId} />
    </HydrateClient>
  );
};

export default Page;
