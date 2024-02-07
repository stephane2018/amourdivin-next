"use-client";

import { Card, CardFooter, CardHeader, Skeleton } from "@nextui-org/react";
import React from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.

  return (
    // <div className="max-w-full  gap-2 grid grid-cols-12 grid-rows-2 px-8">
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //     </CardHeader>
    //     <Skeleton className="rounded-lg z-0 w-full h-full ">
    //       <div className="z-0 w-full h-full object-cover rounded-lg bg-default-300"></div>
    //     </Skeleton>
    //   </Card>
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //     </CardHeader>
    //     <Skeleton className="rounded-lg z-0 w-full h-full ">
    //       <div className="z-0 w-full h-full object-cover rounded-lg bg-default-300"></div>
    //     </Skeleton>
    //   </Card>
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //     </CardHeader>
    //     <Skeleton className="rounded-lg z-0 w-full h-full ">
    //       <div className="z-0 w-full h-full object-cover rounded-lg bg-default-300"></div>
    //     </Skeleton>
    //   </Card>
    //   <Card
    //     isFooterBlurred
    //     className="w-full h-[300px] col-span-12 sm:col-span-5"
    //   >
    //     <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //     </CardHeader>
    //     <Skeleton className="rounded-lg z-0 w-full h-full ">
    //       <div className="z-0 w-full h-full object-cover rounded-lg bg-default-300"></div>
    //     </Skeleton>
    //     <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
    //       <div>
    //         <Skeleton className="rounded-lg">
    //           <div className="h-3 rounded-lg bg-default-300"></div>
    //         </Skeleton>
    //         <Skeleton className="rounded-lg">
    //           <div className="h-3 rounded-lg bg-default-300"></div>
    //         </Skeleton>
    //       </div>
    //     </CardFooter>
    //   </Card>
    //   <Card
    //     isFooterBlurred
    //     className="w-full h-[300px] col-span-12 sm:col-span-7"
    //   >
    //     <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //       <Skeleton className="rounded-lg">
    //         <div className="h-3 rounded-lg bg-default-300"></div>
    //       </Skeleton>
    //     </CardHeader>
    //     <Skeleton className="rounded-lg z-0 w-full h-full ">
    //       <div className="z-0 w-full h-full object-cover rounded-lg bg-default-300"></div>
    //     </Skeleton>
    //     <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
    //       <div className="flex flex-grow gap-2 items-center">
    //         <Skeleton className="rounded-fulz-0 w-full h-full ">
    //           <div className="z-0  w-10 h-11 bg-black object-cover rounded-lg "></div>
    //         </Skeleton>
    //         <div className="flex flex-col">
    //           <Skeleton className="rounded-lg">
    //             <div className="h-3 rounded-lg bg-default-300"></div>
    //           </Skeleton>
    //           <Skeleton className="rounded-lg">
    //             <div className="h-3 rounded-lg bg-default-300"></div>
    //           </Skeleton>
    //         </div>
    //       </div>
    //     </CardFooter>
    //   </Card>
    // </div>
    <Card className="w-[200px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
}