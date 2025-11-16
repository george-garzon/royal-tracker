export interface Ship {
    name: string;
    lat: number;
    lon: number;
    speed: number | null;
    dest: string;
    minutesAgo: number;
    cruiseLine: string;
}
