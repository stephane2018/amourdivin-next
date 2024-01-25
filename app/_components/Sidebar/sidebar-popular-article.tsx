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
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      variant="bordered"
    >
      <Tab
        key="week"
        title={
          <div className="flex items-center space-x-2  ">
            <CalendarDays />
            <span>Cette semaine</span>
          </div>
        }
      >
        <div className="max-w-[26rem] dark:bg-gray-900/20 ">
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
        <div className="max-w-[26rem] dark:bg-gray-900/20 ">
          <ArticleHorizontalSmallItem article={[]} />
        </div>
      </Tab>
    </Tabs>
  );
}
