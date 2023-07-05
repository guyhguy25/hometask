import React, { createContext, useState, useEffect, useContext } from "react";
import { Task } from "../lib/task";
import { filterTasksByStatus } from "../utils/filter";
import {
	sortByTaskDate,
	sortByTaskNumber,
	sortByTaskStatus,
	sortByTaskText,
} from "../utils/sort";
import { countTasks, useFetchTasks } from "../hooks/useFetchTasks";
import { orderByTask } from "../utils/orderby";

type TaskStatus = "completed" | "uncompleted";

type SortDirection = "asc" | "desc";

type SortTask = "number" | "status" | "date" | "text";

interface FilterContextProps {
	filterTasks: Task[] | undefined;
	setFilterTasks: React.Dispatch<React.SetStateAction<Task[] | undefined>>;
	statusTasks: (status: TaskStatus) => void;
	resetTasks: () => void;
	sortTaskNumber: () => void;
	sortTaskStatus: () => void;
	sortTaskDate: () => void;
	sortTaskText: () => void;
	orderBy: (sortDirection: SortDirection) => void;
	completed: number;
	uncompleted: number;
	sortDirection: SortDirection;
	setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const useFilterContext = (): FilterContextProps => {
	const context = useContext(FilterContext);
	if (!context) {
		throw new Error(
			"useFilterContext must be used within a FilterProvider"
		);
	}
	return context;
};

export function FilterProvider({ children }: { children: React.ReactNode }) {
	const { data: tasks, isLoading, isError } = useFetchTasks();
	const [filterTasks, setFilterTasks] = useState<Task[] | undefined>([]);
	const { completed, uncompleted } = countTasks(tasks?.tasks);
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [sortTask, setSortTask] = useState<SortTask>("number");

	useEffect(() => {
		setFilterTasks(tasks?.tasks);
	}, [tasks]);

	const statusTasks = (status: TaskStatus) => {
		const filtered = filterTasksByStatus(tasks?.tasks, status);
		setFilterTasks(filtered);
	};

	const resetTasks = () => {
		setFilterTasks(tasks?.tasks);
	};

	const sortTaskNumber = () => {
		setSortTask("number");
		const sorted = sortByTaskNumber(tasks?.tasks);
		setFilterTasks(sorted);
		orderBy(sortDirection);
	};

	const sortTaskStatus = () => {
		setSortTask("status");
		const sorted = sortByTaskStatus(tasks?.tasks);
		setFilterTasks(sorted);
		orderBy(sortDirection);
	};

	const sortTaskDate = () => {
		setSortTask("date");
		const sorted = sortByTaskDate(tasks?.tasks);
		setFilterTasks(sorted);
		orderBy(sortDirection);
	};

	const sortTaskText = () => {
		setSortTask("text");
		const sorted = sortByTaskText(tasks?.tasks);
		setFilterTasks(sorted);
		orderBy(sortDirection);
	};

	const orderBy = (sortDirection: SortDirection) => {
		const sorted = orderByTask(filterTasks, sortTask, sortDirection);
		setFilterTasks(sorted);
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<div>
				Error occurred while fetching tasks. Check if the server is
				working correctly.
			</div>
		);
	}

	return (
		<FilterContext.Provider
			value={{
				filterTasks,
				setFilterTasks,
				statusTasks,
				resetTasks,
				sortTaskNumber,
				sortTaskStatus,
				sortTaskDate,
				sortTaskText,
				orderBy,
				completed,
				uncompleted,
				sortDirection,
				setSortDirection,
			}}>
			{children}
		</FilterContext.Provider>
	);
}

export default FilterContext;
