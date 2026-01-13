export type FeedItem = {
    id: number;
    title: string;
    posterPath: string | null;
    type: "movies" | "series";
};