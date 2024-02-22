"use client";

import { Card, CardBody } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { CalendarDays } from "lucide-react";
import React, { Key } from "react";
import ArticleHorizontalSmallItem from "../Articles/article-horizontal-small";
import PopularArticleWeek from "./components/popular-article-week";
import PopularArticleMonth from "./components/popular-article-month";
import PopularArticleYear from "./components/popular-article-year";
import PopularArticleAllTime from "./components/popular-article-all-time";

export default function SidePopularArticle() {
  const [selected, setSelected] = React.useState<Key>("week");

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
            <PopularArticleWeek isEnable={selected === "week"} />
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
            <PopularArticleMonth isEnable={selected === "month"} />
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
              <PopularArticleYear isEnable={selected === "year"} />
            </div>
          </Tab>
          <Tab
            key="all-time"
            title={
              <div className="flex items-center space-x-2 ">
                <CalendarDays />
                <span>All time </span>
              </div>
            }
          >
            <div className="max-w-[26rem] flex flex-col dark:bg-gray-900/20 ">
              <PopularArticleAllTime isEnable={selected === "all-time"} />
            </div>
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
}
