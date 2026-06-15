export type Filters = {
    search: string;
    genres: string[];
    minRating: number | null;
    yearFrom: number | null;
    yearTo: number | null;
    status: 'all' | 'published' | 'draft';
};