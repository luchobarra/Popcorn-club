// src/pages/ContentPage.tsx (ejemplo)
import { ContentContainer } from "../containers/ContentContainer";
import { ContentFiltersContainer }from "../containers/ContentFiltersContainer";
import PageCards from "../pages/PageCards";
import { useContent } from "../../context/ContentContext";

const ContentInner = () => {
  const { items, contentType, loading } = useContent();
  return (
    <>
      <ContentFiltersContainer />
      <PageCards movies={items} title={contentType === "movies" ? "Películas" : "Series & TV"} subtitle="Recomendadas para vos" />
    </>
  );
};

export default function ContentPage() {
  return (
    <ContentContainer>
      <ContentInner />
    </ContentContainer>
  );
}