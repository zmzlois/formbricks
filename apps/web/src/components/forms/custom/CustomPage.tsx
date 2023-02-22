"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import TabNavigation from "@/components/TabNavigation";
import { useForm } from "@/lib/forms";
import {
  ChartPieIcon,
  InformationCircleIcon,
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
  { name: "Results", icon: RectangleStackIcon },
  { name: "Overview", icon: ChartPieIcon },
  { name: "Survey Builder", icon: RectangleGroupIcon },
  { name: "Data Pipelines", icon: ShareIcon },
  { name: "Setup Instructions", icon: InformationCircleIcon },
];

export default function CustomPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("Results");
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
      <main className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200 pt-8">
          <h1 className="pb-6 text-4xl font-bold tracking-tight text-gray-900">{form.label}</h1>
          <TabNavigation tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
        {currentTab === "Results" ? (
          <CustomResults />
        ) : currentTab === "Overview" ? (
          <OverviewResults />
        ) : currentTab === "Survey Builder" ? (
          <Builder />
        ) : currentTab === "Data Pipelines" ? (
          <PipelinesOverview />
        ) : currentTab === "Setup Instructions" ? (
          <SetupInstructions />
        ) : null}
      </main>
    </div>
  );
}
