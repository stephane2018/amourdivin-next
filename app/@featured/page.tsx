import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function Featured() {
  return (
    // <div className="max-w-full  gap-2 grid grid-cols-12 grid-rows-2 px-8">
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <p className="text-tiny text-white/60 uppercase font-bold">
    //         What to watch
    //       </p>
    //       <h4 className="text-white font-medium text-large">
    //         Stream the Acme event
    //       </h4>
    //     </CardHeader>
    //     <Image
    //       removeWrapper
    //       alt="Card background"
    //       className="z-0 w-full h-full object-cover"
    //       src="https://images.unsplash.com/photo-1683009427051-00a2fe827a2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
    //     />
    //   </Card>
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <p className="text-tiny text-white/60 uppercase font-bold">
    //         Plant a tree
    //       </p>
    //       <h4 className="text-white font-medium text-large">
    //         Contribute to the planet
    //       </h4>
    //     </CardHeader>
    //     <Image
    //       removeWrapper
    //       alt="Card background"
    //       className="z-0 w-full h-full object-cover"
    //       src="https://images.unsplash.com/photo-1702165640016-bf7b60521f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
    //     />
    //   </Card>
    //   <Card className="col-span-12 sm:col-span-4 h-[300px]">
    //     <CardHeader className="absolute z-10 top-1 flex-col !items-start">
    //       <p className="text-tiny text-white/60 uppercase font-bold">
    //         Supercharged
    //       </p>
    //       <h4 className="text-white font-medium text-large">
    //         Creates beauty like a beast
    //       </h4>
    //     </CardHeader>
    //     <Image
    //       removeWrapper
    //       alt="Card background"
    //       className="z-0 w-full h-full object-cover"
    //       src="https://images.unsplash.com/photo-1682685797439-a05dd915cee9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8"
    //     />
    //   </Card>
    //   <Card
    //     isFooterBlurred
    //     className="w-full h-[300px] col-span-12 sm:col-span-5"
    //   >
    //     <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //       <p className="text-tiny text-white/60 uppercase font-bold">New</p>
    //       <h4 className="text-black font-medium text-2xl">Acme camera</h4>
    //     </CardHeader>
    //     <Image
    //       removeWrapper
    //       alt="Card example background"
    //       className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
    //       src="https://images.unsplash.com/photo-1700694177564-1bfae45112e0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
    //     />
    //     <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
    //       <div>
    //         <p className="text-black text-tiny">Available soon.</p>
    //         <p className="text-black text-tiny">Get notified.</p>
    //       </div>
    //       <Button className="text-tiny" color="primary" radius="full" size="sm">
    //         Notify Me
    //       </Button>
    //     </CardFooter>
    //   </Card>
    //   <Card
    //     isFooterBlurred
    //     className="w-full h-[300px] col-span-12 sm:col-span-7"
    //   >
    //     <CardHeader className="absolute z-10 top-1 flex-col items-start">
    //       <p className="text-tiny text-white/60 uppercase font-bold">
    //         Your day your way
    //       </p>
    //       <h4 className="text-white/90 font-medium text-xl">
    //         Your checklist for better sleep
    //       </h4>
    //     </CardHeader>
    //     <Image
    //       removeWrapper
    //       alt="Relaxing app background"
    //       className="z-0 w-full h-full object-cover"
    //       src="https://images.unsplash.com/photo-1702165640016-bf7b60521f16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8"
    //     />
    //     <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
    //       <div className="flex flex-grow gap-2 items-center">
    //         <Image
    //           alt="Breathing app icon"
    //           className="rounded-full w-10 h-11 bg-black"
    //           src="https://images.unsplash.com/photo-1682686581776-b6ebee7c150e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
    //         />
    //         <div className="flex flex-col">
    //           <p className="text-tiny text-white/60">Breathing App</p>
    //           <p className="text-tiny text-white/60">Get a good s sleep.</p>
    //         </div>
    //       </div>
    //       <Button radius="full" size="sm">
    //         Get App
    //       </Button>
    //     </CardFooter>
    //   </Card>
    // </div>
    <div>fndbskfdsfjhn</div>
  );
}
