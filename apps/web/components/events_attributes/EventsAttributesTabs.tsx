import SecondNavbar from "../environments/SecondNavBar";

interface PeopleGroupTabs {
  activeId: string;
  environmentId: string;
}

export default function PeopleGroupsTabs({ activeId, environmentId }: PeopleGroupTabs) {
  const tabs = [
    { id: "events", name: "Events", href: `/environments/${environmentId}/events` },
    { id: "attributes", name: "Attributes", href: `/environments/${environmentId}/attributes` },
  ];

  return <SecondNavbar tabs={tabs} activeId={activeId} environmentId={environmentId} />;
}
