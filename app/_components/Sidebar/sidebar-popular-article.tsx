"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { CalendarDays } from "lucide-react";
import React from "react";
import ArticleHorizontalItem from "../Articles/article-horizontal";
import ArticleHorizontalSmallItem from "../Articles/article-horizontal-small";

export default function SidePopularArticle() {
  const [selected, setSelected] = React.useState("week");
  return (
    <Card className="border-none   w-full  md:max-w-2xl my-3 flex flex-col">
      <CardBody>
        <Tabs
          aria-label="Options"
          selectedKey={selected}
          onSelectionChange={setSelected}
          variant="solid"
        >
          <Tab
            key="week"
            title={
              <div className="flex items-center space-x-2  ">
                <CalendarDays />
                <span>Cette Semaine</span>
              </div>
            }
          >
            <div className="max-w-full   dark:bg-gray-900/20 ">
              <ArticleHorizontalSmallItem article={[]} />
            </div>
          </Tab>
          <Tab
            key="month"
            title={
              <div className="flex items-center space-x-2  ">
                <CalendarDays />
                <span>Ce Mois</span>
              </div>
            }
          >
            <div className="max-w-[26rem] dark:bg-gray-900/20 ">
              <ArticleHorizontalSmallItem article={[]} />
            </div>
          </Tab>
          <Tab
            key="year"
            title={
              <div className="flex items-center space-x-2 ">
                <CalendarDays />
                <span>Cette Annee </span>
              </div>
            }
          >
            <div className="max-w-[26rem] flex flex-col dark:bg-gray-900/20 ">
              <ArticleHorizontalSmallItem article={[]} />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
