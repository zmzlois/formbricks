import ContentWrapper from "@/components/ui/ContentWrapper";
import PeopleList from "./PeopleList";
import PeopleGroupsTabs from "@/components/people_groups/PeopleGroupsTabs";

export default function EventsAttributesPage({ params }) {
  return (
    <>
      <PeopleGroupsTabs activeId="people" environmentId={params.environmentId} />
      <ContentWrapper>
        <PeopleList environmentId={params.environmentId} />
      </ContentWrapper>
    </>
  );
}
