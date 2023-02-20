"use client";

import TemplatesPage from "@/components/forms/TemplatesPage";
import LayoutApp from "@/components/layout/LayoutApp";
import LayoutWrapperOrganisation from "@/components/layout/LayoutWrapperOrganisation";
import { useRouter } from "next/router";

export default function IntegrationPage({}) {
  const router = useRouter();
  return (
    <LayoutApp>
      <LayoutWrapperOrganisation>
        <TemplatesPage organisationId={router.query.organisationId} />
      </LayoutWrapperOrganisation>
    </LayoutApp>
  );
}
