"use client";
import { SearchIcon } from "@/components/icons";
import { IPostsModels } from "@/core/interfaces/posts";
import PostesServices from "@/core/services/poste.service";
import posteAudiosService from "@/core/services/posteAudios.service";
import { ClimpText, disPlayImageUrl } from "@/core/utils/helpers.utils";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import {
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState } from "react";

const SearchArticle = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [searchPosts, setsearchPosts] = useState<IPostsModels[]>([]);
  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    await PostesServices.SearchIntoPostes(newValue).then((data) => {
      setsearchPosts(data.documents);
    });
  };

  return (
    <>
      <SearchIcon
        onClick={onOpen}
        className="text-base text-default-400  md:hidden cursor-pointer flex-shrink-0"
      />
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[10rem]  h-10 md:flex hidden",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
        }}
        onClick={onOpen}
        aria-label="Search"
        endContent={
          <Kbd className="hidden lg:inline-block" keys={["command"]}>
            K
          </Kbd>
        }
        labelPlacement="outside"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />

      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <Input
                  classNames={{
                    base: "max-w-full my-2 h-10 flex mt-5 ",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20 ",
                  }}
                  onChange={onChange}
                  onClick={() => onOpen}
                  aria-label="Search"
                  endContent={
                    <Kbd className="hidden lg:inline-block" keys={["command"]}>
                      K
                    </Kbd>
                  }
                  labelPlacement="outside"
                  placeholder="Search..."
                  startContent={
                    <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  type="search"
                />
              </ModalHeader>
              <ModalBody className="flex flex-col w-full gap-2 max-h-[300px] h-full">
                {searchPosts !== undefined ? (
                  <div className="flex flex-col mb-2 text-slate-600/40 bg-gray-100/40 dark:bg-black/60 rounded-lg gap-2 h-[250px] w-full  mx-auto my-auto text-center justify-center  ">
                    {(searchPosts || []).map((item) => (
                      <Link
                        key={`${item.id}search`}
                        href={`/${item?.title_slug}`}
                        className="my-2 flex cursor-pointer flex-row justify-start rounded-md px-2 py-2 text-gray-700 hover:bg-green-100 hover:text-green-400"
                      >
                        {item?.image_default ? (
                          <Image
                            className="m-2  h-8 w-8 rounded-full  object-cover"
                            src={disPlayImageUrl(item?.image_default || "")}
                            alt="img"
                          />
                        ) : (
                          <div className="m-2 h-8 w-8 animate-pulse rounded-full bg-slate-200 " />
                        )}
                        <div className="left-2 justify-items-start px-2 font-medium ">
                          {ClimpText(item.title, 100)}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col mb-2 text-slate-600/40 bg-gray-100/40 dark:bg-black/60 rounded-lg gap-2 h-[250px] w-full  mx-auto my-auto text-center justify-center  ">
                    <h3 className="justify-center items-center flex ">
                      {" "}
                      veuillez saisir ce que vous recherchez
                    </h3>
                    <h5 className="justify-center items-center flex ">
                      {" "}
                      que vous recherchez{" "}
                    </h5>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchArticle;
