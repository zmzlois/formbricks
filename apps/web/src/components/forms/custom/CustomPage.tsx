"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import TabNavigation from "@/components/TabNavigation";
import { useForm } from "@/lib/forms";
import {
  ChartPieIcon,
  CodeBracketIcon,
  RectangleStackIcon,
  ShareIcon,
  RectangleGroupIcon,
} from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import PipelinesOverview from "../pipelines/PipelinesOverview";
import OverviewResults from "./OverviewResults";
import CustomResults from "./CustomResults";
import SetupInstructions from "./SetupInstructions";
import Builder from "../builder/Builder";

const tabs = [
  { name: "Create", icon: RectangleGroupIcon },
  { name: "Connect", icon: ShareIcon },
  { name: "Embed", icon: CodeBracketIcon },
  { name: "Responses", icon: RectangleStackIcon },
  { name: "Summary", icon: ChartPieIcon },
];

export default function CustomPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("Responses");
  const { form, isLoadingForm, isErrorForm } = useForm(
    router.query.formId?.toString(),
    router.query.organisationId?.toString()
  );

  if (isLoadingForm) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isErrorForm) {
    return <div>Error loading ressources. Maybe you don&lsquo;t have enough access rights.</div>;
  }

  return (
    <div>
      <main className="">
        <div className="border-b border-slate-200">
          <TabNavigation
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            name={form.label}
          />
        </div>
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          {currentTab === "Responses" ? (
            <CustomResults />
          ) : currentTab === "Summary" ? (
            <OverviewResults />
          ) : currentTab === "Create" ? (
            <Builder />
          ) : currentTab === "Connect" ? (
            <PipelinesOverview />
          ) : currentTab === "Embed" ? (
            <SetupInstructions />
          ) : null}
        </div>
      </main>
    </div>
  );
}
