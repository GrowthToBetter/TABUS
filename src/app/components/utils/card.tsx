"use client";
{
  /* <FormButton
            variant="base"
            onClick={() => {
              if (
                file.mimetype.includes("msword") ||
                file.mimetype.includes(
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                )
              ) {
                setOpenProfiles(true);
              } else {
                router.push(file.path);
              }
              addView();
            }}
            className=" text-blue-500 hover:underline">
            Lihat File
          </FormButton>
        <>
          {openProfiles && (
            <ModalProfile
              title={file.filename}
              onClose={() => setOpenProfiles(false)}
              className="h-screen">
              <iframe
                className="w-full h-full"
                src={`${file.path}&output=embed`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sandbox="allow-scripts allow-modals allow-popups allow-presentation allow-same-origin"
                allowFullScreen></iframe>
            </ModalProfile>
          )}
        </> */
}

import { FileCardProps, UserProfileCardProps } from "./Hero";
import Image from "next/image";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import { Button } from "./buttons";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import toast from "react-hot-toast";
import { commentFile } from "@/utils/server-action/userGetServerSession";
import { useSession } from "next-auth/react";
import * as Dialog from "@radix-ui/react-dialog";
import { User, X } from "lucide-react";
import { toast as Toaster } from "sonner";
import ModalProfile from "./Modal";

const items = () => [
  {
    label: "Baca",
    action: (action: () => void) => {
      action();
    },
  },
  {
    label: "Beli",
    action: async () => {
      Toaster.message("this feature is not available yet");
    },
  },
];

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  currentUser,
  session,
}) => (
  <div className="w-full bg-white rounded-3xl pb-6">
    <AspectRatio.Root ratio={16 / 9}>
      <Image
        src={
          (currentUser.cover as string) ||
          "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png"
        }
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="rounded-t-3xl"
      />
    </AspectRatio.Root>
    <div className="relative -mt-8 ml-4">
      <div className="rounded-full overflow-hidden w-[60px] h-[60px]">
        <Image
          src={
            session?.user?.image ||
            "https://res.cloudinary.com/dvwhepqbd/image/upload/v1720580914/pgfrhzaobzcajvugl584.png"
          }
          height={60}
          width={60}
          alt="profile"
          className="object-cover"
        />
      </div>
      <div className="ml-16 -mt-3">
        <p className="font-medium text-lg text-black">{session?.user?.name}</p>
        <p className="text-sm text-slate-600">{session?.user?.role}</p>
      </div>
    </div>
  </div>
);

export const FileCard: React.FC<FileCardProps> = ({ file, onLike, user }) => {
  const [comment, setComment] = useState("");
  const [openComment, setOpenComment] = useState<string | null>(null);
  const [openCommentUser, setOpenCommentUser] = useState<string | null>(null);
  const [openProfiles, setOpenProfiles] = useState(false);
  const handleSubmitComment = async (id: string) => {
    if (!comment.trim()) {
      toast.error("Komentar tidak boleh kosong");
      return;
    }
    if (!user) return toast.error("Anda belum login");
    const toastId = toast.loading("Mengirim komentar...");
    try {
      const commentFiles = await commentFile(
        comment,
        { connect: { id } },
        { connect: { id: user.id as string } }
      );
      if (!commentFiles) return toast.error("Gagal mengirim komentar");
      toast.success("Komentar berhasil dikirim", { id: toastId });
      setComment("");
      setOpenCommentUser(null);
    } catch (error) {
      toast.error((error as Error).message, { id: toastId });
    }
  };
  const { data: session, status } = useSession();

  return (
    <div className="w-full bg-slate-50 relative rounded-3xl pb-6 border border-slate-200">
      <div className="relative rounded-t-3xl overflow-hidden cursor-pointer group">
        <Image
          src={
            file.coverFile
              ? (file.coverFile as string)
              : "https://res.cloudinary.com/dhjeoo1pm/image/upload/v1726727429/mdhydandphi4efwa7kte.png"
          }
          unoptimized
          quality={100}
          width={100}
          height={100}
          alt="banner"
          className="w-full object-cover object-center h-40 rounded-t-3xl"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between mb-6">
          <p className="font-medium text-sm text-black">{file.filename}</p>
          <p
            className="font-medium text-sm text-black"
            aria-label={`${file.views} views`}>
            views: {file.views}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button
              variant="base"
              onClick={onLike}
              className="p-1"
              aria-label={`Like ${file.filename}. Current likes: ${file.Like}`}>
              Like: {file.Like}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-black rounded-md hover:text-black hover:bg-white duration-200 hover:border-2 p-2">
                  Action
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-white border border-gray-200 rounded-md p-2 shadow-lg"
                sideOffset={5}>
                {items().map((childItem, childIndex) => (
                  <DropdownMenuItem key={childIndex} asChild>
                    <Button
                      variant="default"
                      className="text-white hover:text-Secondary cursor-pointer"
                      onClick={() => {
                        childItem.action(() => {
                          setOpenProfiles(true);
                        });
                      }}>
                      {childItem.label}
                    </Button>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setOpenCommentUser(openCommentUser === file.id ? null : file.id)
                }
                className="p-2 text-blue-500 hover:underline">
                Comment
              </button>
            </div>
          </div>

          {openCommentUser === file.id && (
            <div className="mt-4 absolute p-4 bg-white border border-gray-200 rounded-md shadow-lg w-full">
              <textarea
                placeholder="Tulis komentar Anda..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border rounded-md min-h-[6rem]"
              />

              <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSubmitComment(file.id)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Kirim Komentar
              </button>
              <button
                onClick={() => setOpenCommentUser(null)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                close
              </button>
              </div>
            </div>
          )}

          {((status === "authenticated" && session.user?.role === "ADMIN") ||
            session?.user?.role === "SUPERADMIN") &&
            file.comment && (
              <Dialog.Root
                open={openComment === file.id}
                onOpenChange={(open) => setOpenComment(open ? file.id : null)}>
                <Dialog.Trigger className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                  Lihat Komentar
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                  <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] overflow-y-auto">
                    <Dialog.Title className="text-xl font-semibold mb-4">
                      Komentar untuk {file.filename}
                    </Dialog.Title>

                    <div className="flex justify-end">
                      <Dialog.Close className="p-2 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                      </Dialog.Close>
                    </div>

                    <div className="space-y-4">
                      {file.suggest &&
                        file.suggest.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <User size={20} className="text-gray-600" />
                              <span className="font-medium">
                                {comment.user?.name}
                              </span>
                              <span className="text-sm text-gray-500">
                                {comment.user?.role}
                              </span>
                            </div>
                            <p className="text-gray-700">{comment.Text}</p>
                          </div>
                        ))}
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
        </div>
      </div>

      {openProfiles && (
        <ModalProfile
          title={file.filename}
          onClose={() => setOpenProfiles(false)}
          className="h-screen">
          <iframe
            className="w-full h-full"
            src={`https://drive.google.com/file/d/${file.permisionId}/preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sandbox="allow-scripts allow-modals allow-popups allow-presentation allow-same-origin"
            allowFullScreen></iframe>
        </ModalProfile>
      )}
    </div>
  );
};
