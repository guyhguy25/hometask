import { Task } from "../lib/task";

type SortTask = "number" | "status" | "date" | "text";

export const orderByTask = (tasks: Task[] | undefined, sortTask: SortTask, sortDirection: 'asc' | 'desc') => {
    return tasks?.slice().sort((a, b) => {
        let valueA: number | Date | string = "";
        let valueB: number | Date | string = "";

        if (sortTask === "number") {
            valueA = a.taskNumber || 0;
            valueB = b.taskNumber || 0;
        } else if (sortTask === "date") {
            valueA = new Date(a.createdAt);
            valueB = new Date(b.createdAt);
        } else {
            valueA = a[sortTask as keyof Task] || "";
            valueB = b[sortTask as keyof Task] || "";
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
            const compareResult = valueA.localeCompare(valueB);
            return sortDirection === "asc" ? compareResult : -compareResult;
        } else if (valueA instanceof Date && valueB instanceof Date) {
            return sortDirection === "asc"
                ? valueA.getTime() - valueB.getTime()
                : valueB.getTime() - valueA.getTime();
        } else if (
            typeof valueA === "number" &&
            typeof valueB === "number"
        ) {
            return sortDirection === "asc"
                ? valueA - valueB
                : valueB - valueA;
        }

        return 0;
    });
}