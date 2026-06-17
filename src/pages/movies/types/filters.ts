export type FiltersModel = {
    search: string;
    genres: string[];
    minRating: number | null;
    yearFrom: number | null;
    yearTo: number | null;
    status: 'all' | 'active' | 'deactive';
};