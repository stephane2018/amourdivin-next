"use client";
import { IPostsModels } from "@/core/interfaces/posts";
import { disPlayImageForFrontUrl } from "@/core/utils/helpers.utils";
import { useCopyToClipboard } from "@/hooks/commom/useClilBoard";
import { Share } from "@capacitor/share";
import {
  Button,
  Chip,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import {
  CheckCheckIcon,
  CheckIcon,
  Copy,
  CopyIcon,
  MailIcon,
  Share2,
} from "lucide-react";
import { ReactNode, SVGProps, useState } from "react";
import {
  isBrowser,
  isMobile,
  isMobileOnly,
  isTablet,
} from "react-device-detect";
import { toast } from "sonner";
import { cn } from "tailwind-variants";

type SocialLink = {
  color: string;
  type: "X" | "facebook" | "whatsapp";
  svgComponent: ReactNode;
  hiddenTxt: string;
  windowsTitle?: string;
};

const socialLink: SocialLink[] = [
  {
    color: "bg-blue-500",
    type: "facebook",
    hiddenTxt: "Facebook",
    svgComponent: (
      <svg
        className="h-5 w-5 fill-white"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    color: "bg-black",
    hiddenTxt: "X",
    type: "X",
    svgComponent: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 512 512"
      >
        <g clipPath="url(#clip0_84_15697)">
          <rect width="512" height="512" fill="#000" rx="60"></rect>
          <path
            fill="#fff"
            d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_84_15697">
            <rect width="512" height="512" fill="#fff"></rect>
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    color: "bg-green-500",
    hiddenTxt: "Whasapp",
    type: "whatsapp",
    svgComponent: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 124 124"
        width="24"
        height="24"
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M64,15.8c-25.5,0-46.2,20.7-46.2,46.2c0,9,2.5,17.6,7.4,25.1l-7,15.5
      c-0.6,1.4-0.4,3.1,0.6,4.3c0.8,0.9,1.9,1.4,3.1,1.4c0.4,0,0.7,0,1.1-0.1l19.4-5.3c6.7,3.6,14.2,5.5,21.8,5.5
      c25.5,0,46.2-20.7,46.2-46.2C110.2,36.5,89.5,15.8,64,15.8z M64,100.2c-6.8,0-13.4-1.8-19.2-5.2c-0.6-0.4-1.3-0.6-2-0.6
      c-0.4,0-0.7,0-1.1,0.1L29,98l4.4-9.7c0.6-1.3,0.4-2.9-0.4-4c-4.7-6.5-7.2-14.2-7.2-22.3C25.8,41,43,23.8,64,23.8
      c21,0,38.2,17.1,38.2,38.2C102.2,83,85.1,100.2,64,100.2z"
          clipRule="evenodd"
        ></path>
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M81.8,68.9c-1.9-1.2-4.5-2.5-6.7-1.5c-1.7,0.7-2.9,3.5-4,4.9c-0.6,0.7-1.3,0.8-2.2,0.5
      c-6.6-2.6-11.6-7-15.2-13c-0.6-0.9-0.5-1.7,0.2-2.6c1.1-1.3,2.5-2.8,2.8-4.5c0.3-1.7-0.5-3.8-1.2-5.3c-0.9-2-1.9-4.8-3.9-5.9
      c-1.8-1-4.2-0.5-5.8,0.9c-2.8,2.3-4.2,5.9-4.1,9.4c0,1,0.1,2,0.4,3c0.6,2.3,1.6,4.5,2.9,6.6c0.9,1.6,1.9,3.1,3,4.5
      c3.5,4.8,7.9,8.9,12.9,12c2.5,1.5,5.3,2.9,8.1,3.8c3.2,1,6,2.1,9.4,1.5c3.6-0.7,7.1-2.9,8.5-6.3c0.4-1,0.6-2.2,0.4-3.2
      C86.6,71.3,83.6,70,81.8,68.9z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
];

export function generateUrl(
  url?: string | undefined,
  base_url?: string | undefined
) {
  return `${base_url || process.env.NEXT_PUBLIC_WEB_SITE_URL}${
    url ? "/" + url : "" || ""
  }`;
}

const ShareSocialLink = ({
  item,
  link,
  articleTitle,
}: {
  link: string;
  articleTitle: string;
  item: SocialLink;
}) => {
  const { color, windowsTitle = "Partager ce post", svgComponent, type } = item;

  function buildUrlToSahre(link: string, articleTitle: string) {
    let FinalLink = "";
    if (type === "X") {
      FinalLink = `https://twitter.com/share?url=${link}text=${encodeURIComponent(
        articleTitle
      )}`;
    } else if (type === "facebook") {
      FinalLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    } else if (type === "whatsapp") {
      FinalLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
        articleTitle
      )}-${link}`;
    }

    return FinalLink;
  }
  return (
    <button
      className={`
        ${color ? color : "bg-blue-500"}
        "inline-flex cursor-pointer shadow-md items-center space-x-2 rounded-xl p-3 font-semibold text-white"
      `}
      onClick={() => {
        if (link) {
          const url = buildUrlToSahre(link, articleTitle);
          console.log(url);
          window.open(`${url}`, windowsTitle, "width=640,height=450");
        }
      }}
    >
      {svgComponent}
    </button>
  );
};
export default function SocialMediaShare({
  link,
  article,
}: {
  link: string;
  article: IPostsModels;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [copyToClipboard, setResult] = useCopyToClipboard();
  const [copyStatus, setCopyStatus] = useState(false);
  const [linktext, setLinktext] = useState("");
  const [errorr, seterror] = useState<any>();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinktext(e.target.value);
  };

  const resetCLipBoardStatus = () => {
    setTimeout(() => {
      setCopyStatus(false);
    }, 5000);
  };

  const handleClickCopy = async () => {
    await navigator.clipboard
      .writeText(linktext)
      .then((state) => {
        setCopyStatus(true);
        resetCLipBoardStatus();
      })
      .catch((e) => {
        toast.error("une erreur est survenue");
      });
  };

  // const OpenShareOnPhone = async ({
  //   title,
  //   description,
  //   link,
  // }: {
  //   title: string;
  //   description: string;
  //   link: string;
  // }) => {
  //   await Share.share({
  //     title: title,
  //     text: description,
  //     url: link,
  //     dialogTitle: "Share",
  //   });
  // };
  return (
    <>
      <Button
        onPress={async () => {
          // const shareData: ShareData = {
          //   url: link,
          //   text: article.title,
          // };
          // if (isMobile || isTablet) {
          //   if (
          //     typeof window !== "undefined" &&
          //     navigator &&
          //     navigator.canShare(shareData)
          //   ) {
          //     OpenShareOnPhone({
          //       description: article.summary,
          //       title: article.title,
          //       link: link,
          //     });
          //   }
          // } else {
          onOpen();
          // }
        }}
        color="warning"
        variant="faded"
        aria-label="share"
        endContent={<Share2 />}
      >
        Partager
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={isMobileOnly || isTablet ? "bottom-center" : "top-center"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Partager sur les reseaux sociaux{" "}
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-4 mb-4 mx-auto ">
                  {(socialLink || []).map((item, i) => (
                    <ShareSocialLink
                      key={`${i}/share`}
                      link={link}
                      item={item}
                      articleTitle={article.title}
                    />
                  ))}
                </div>
                <div
                  className="flex gap-3 p-2 bg-gray-300/40 dark:bg-black/60  rounded-xl"
                  onClick={() => handleClickCopy()}
                >
                  <Image
                    alt="Card background"
                    className="object-cover rounded-xl   h-[70px]  "
                    src={disPlayImageForFrontUrl(article?.image_default || "")}
                  />
                  <div className="flex-col flex gap-3 ">
                    <span
                      className={
                        "line-clamp-2 text-[11px] cursor-pointer font-bold text-black dark:text-white  "
                      }
                    >
                      {article.title}
                    </span>
                    <span
                      className={
                        "line-clamp-1 text-[9px] cursor-pointer  md:text-sm text-default-500 text-black/60 dark:text-gray-300 "
                      }
                    >
                      {article.summary}
                    </span>
                  </div>
                  <div className="line-clamp-2 text-sm cursor-pointer font-bold text-black dark:text-white  ">
                    {copyStatus ? (
                      <CheckCheckIcon className="text-4xl p-1 text-green-500  cursor-pointer   flex-shrink-0" />
                    ) : (
                      <CopyIcon
                        className="text-4xl p-1  cursor-pointer text-default-400  flex-shrink-0"
                        onClick={() => handleClickCopy()}
                      />
                    )}
                  </div>
                </div>
                <Input
                  className="hover:cursor-pointer"
                  disabled={true}
                  endContent={
                    copyStatus ? (
                      <CheckCheckIcon className="text-4xl p-1 text-green-500  cursor-pointer   flex-shrink-0" />
                    ) : (
                      <div className="flex text-[11px] gap-3 cursor-pointer">
                        <span className="">Copier</span>
                        <CopyIcon
                          className="text-4xl p-1  text-default-400  flex-shrink-0"
                          onClick={() => handleClickCopy()}
                        />
                      </div>
                    )
                  }
                  value={`${link}`}
                  validationBehavior="native"
                  variant="faded"
                  onChange={handleChangeInput}
                  errorMessage={
                    copyStatus ? (
                      <span className="!text-green-600 text-md transition-all duration-100">
                        Copie Effecuté
                      </span>
                    ) : null
                  }
                />
                {/* <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                /> */}
                {/* <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div> */}
              </ModalBody>
              <ModalFooter>
                <div className="text-white">{errorr || ""}</div>
                <Button onPress={onClose}>Fermer</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
