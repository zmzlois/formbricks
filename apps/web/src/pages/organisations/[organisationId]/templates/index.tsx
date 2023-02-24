"use client";

import TemplatesPage from "@/components/forms/TemplatesPage";
import LayoutApp from "@/components/layout/LayoutApp";
import { useRouter } from "next/router";

export default function IntegrationPage({}) {
  const router = useRouter();
  return (
    <LayoutApp>
      <TemplatesPage organisationId={router.query.organisationId} />
    </LayoutApp>
  );
}
