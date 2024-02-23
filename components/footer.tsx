import { storage } from "@/core/config/AppwriteConfig";
import { SettingsModels } from "@/core/interfaces/settings";
import settingsService from "@/core/services/settings.service";
import { Button, Card, CardBody, Image, Tooltip } from "@nextui-org/react";
import { Facebook, Youtube } from "lucide-react";
import Link from "next/link";
import React, { FC } from "react";
import { URL } from "url";

interface IFooter {
  logo: URL;
  setting: SettingsModels | null;
}
export const Footer: FC<IFooter> = ({ logo, setting }) => {
  return (
    <div className="w-full  flex flex-col">
      <Card className="shadow-small  rounded-none ">
        <div className=" mx-auto gap-5 container flex flex-col mb-4">
          <div className="flex md:justify-between w-full p-4 gap-4">
            <div className=" w-full flex flex-col gap-4 ">
              {logo && (
                <Image
                  width={0}
                  alt="Card background"
                  className="rounded-xl w-full "
                  src={logo.href}
                />
              )}
              {setting && (
                <p className="text-justify text-sm  cursor-pointer text-default-500 text-black/60 dark:text-gray-300 ">
                  {setting.site_description || ""}
                </p>
              )}
            </div>
            <div className="  w-full gap-3 flex justify-between">
              <div className="mt-8 flex md:ml-10 justify-between gap-3 ">
                <div className="gap-3">
                  <h2 className="text-sm font-semibold uppercase ">Liens</h2>
                  <ul
                    className="
                gap-10 mt-3 text-sm font-medium text-default-500 text-black/60 dark:text-gray-300
                 "
                  >
                    <li className="mb-2 hover:text-primary-500 transition-colors duration-300">
                      <a href="#" className="hover:underline">
                        Contacts
                      </a>
                    </li>
                    <li className="mb-2 hover:text-primary-500 transition-colors duration-300">
                      <a href="#" className="hover:underline">
                        Terms &amp; Conditions
                      </a>
                    </li>
                    <li className="mb-2 hover:text-primary-500 transition-colors duration-300 ">
                      <a href="#" className="hover:underline">
                        A propos de nous{" "}
                      </a>
                    </li>
                  </ul>

                  <div className="flex gap-3 mr-4 mt-4">
                    <Button
                      href="#"
                      className="w-10 h-10 bg-blue-700 text-white"
                      isIconOnly
                      aria-label="facebook"
                    >
                      <Facebook size={18} />
                    </Button>
                    <Button
                      href="#"
                      className="w-10 h-10 bg-red-700 text-white"
                      isIconOnly
                      aria-label="facebook"
                    >
                      <Youtube size={18} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className=" gap-3 flex flex-col items-center justify-center mx-auto">
                <Tooltip
                  showArrow
                  content="Cliquez ici pour telecharger l'application "
                >
                  <div className=" mx-2 flex w-auto  cursor-pointer items-center rounded-lg bg-black  py-2 p-2 ">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                      className="w-7"
                      alt="img"
                    />
                    <div className="ml-3 cursor-pointer text-left">
                      <p className="text-xs font-bold text-gray-200">
                        Telecharger sur{" "}
                      </p>
                      <p className="text-xs font-bold text-gray-200 ">
                        {" "}
                        Google Play Store{" "}
                      </p>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip content="Cliquez ici pour telecharger l'application sur ios">
                  <div className=" mx-2 flex w-auto   cursor-pointer  rounded-lg bg-black px-4 py-2">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                      className="w-7"
                      alt="img"
                    />
                    <div className="ml-3 cursor-pointer  text-left">
                      <p className="text-xs font-bold text-gray-200">
                        Telecharger sur{" "}
                      </p>
                      <p className="text-xs text-gray-200 "> Apple Store </p>
                    </div>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className=" justify-between p-4 bg-black/20 dark:bg-black/60 ">
          <div className=" mx-auto gap-3 container flex justify-between p-3">
            <span className="text-xs sm:text-center text-default-500 text-black/80 dark:text-gray-300">
              © {new Date().getFullYear().toString()}{" "}
              <Link href="#" className="hover:underline">
                Amourdivin™
              </Link>
              . Tous droits reservés.
            </span>
            <Link
              className="sm:text-center text-xs text-default-500 text-black/80 dark:text-gray-300"
              href={"#"}
            >
              {" "}
              contactez moi
              <span className="px-1 hover:underline text-primary-500 transition-colors duration-300">
                bitebstephane@gmail.com{" "}
              </span>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Footer;
