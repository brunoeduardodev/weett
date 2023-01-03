import { consts } from "@/config/consts";
import { useBody } from "@/hooks/useBody";
import { trpc } from "@/utils/trpc";
import * as Dialog from "@radix-ui/react-dialog";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@weett/server";
import { Button } from "@weett/ui";
import { PostPreview } from "./PostPreview";

type Props = {
  post: inferRouterOutputs<AppRouter>["feed"]["get"]["posts"][0];

  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;
};

export const ReplyDialog = ({ isOpen, onClose, onSubmit, post }: Props) => {
  const { data: currentUser, isLoading, error } = trpc.user.me.useQuery();
  const body = useBody();

  if (!currentUser || isLoading || error) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal container={body}>
        <Dialog.DialogOverlay className="bg-black bg-opacity-25 fixed inset-0 transition-colors ease-in-out duration-300 z-50" />

        <Dialog.Content className="bg-white rounded-sm shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-h-[85vh] max-w-xl p-6 animate-modal-open flex flex-col z-50">
          <div className="flex flex-col">
            <PostPreview post={post} />
            <div className="flex gap-3 w-full">
              <img
                src={currentUser.profile.avatarUrl || consts.DEFAULT_PROFILE}
                alt="Your Avatar"
                className="w-12 h-12 rounded-full"
              />

              <textarea
                className="w-full mt-2 p-2"
                placeholder="Weet your reply"
              ></textarea>
            </div>

            <Button className="self-end mt-2 rounded-full">Send</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
