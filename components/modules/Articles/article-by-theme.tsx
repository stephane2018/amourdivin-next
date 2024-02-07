import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const ThemeItem = () => {
  return (
    <div className=" shadow-none cursor-pointer gap-2 p-1.5 bg-foreground-50 items-center flex rounded-xl border border-primary-200 w-fit">
      <Avatar
        size="sm"
        className="rounded-xl bg-primary-700 text-white font-medium"
        name="Ju"
      />
      <p className="text-xs">Amourdivin</p>
    </div>
  );
};

export default function ArticleByThemes() {
  return (
    <Card className=" w-full gap-1 my-10 ">
      <CardHeader className=" items-center justify-center flex flex-col ">
        <h1 className="text-4xl font-extrabold  ">Thèmes </h1>
        <h4 className="font-normal text-slate-500">
          {" "}
          Les enseignements classes par thèmes{" "}
        </h4>
      </CardHeader>
      <CardBody className="gap-4 flex flex-wrap items-start  ">
        <ul className="mx-auto gap-5 flex max-w-2xl flex-wrap justify-center">
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
          <li>
            <ThemeItem />
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}
