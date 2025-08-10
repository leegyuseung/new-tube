"use client";

import { toast } from "sonner";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StudioUploader } from "./studio-uploader";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { ResponsiveModal } from "@/components/responsive-dialog";

export const StudioUploadModal = () => {
  const router = useRouter();
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created");
      utils.studio.getMany.invalidate(); // 성공하면 재조회
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;

    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };

  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={!!create.data?.url} // 데이터가 있을 경우에만 오픈하도록
        onOpenChange={() => create.reset()}
      >
        {create.data?.url ? (
          <StudioUploader endpoint={create.data.url} onSuccess={onSuccess} />
        ) : (
          <Loader2Icon />
        )}
      </ResponsiveModal>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <PlusIcon />
        )}
        Create
      </Button>
    </>
  );
};
