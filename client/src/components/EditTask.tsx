import React from "react";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { TaskModal } from "../modals/TaskModal";

interface EditTaskProps {
	modal: boolean;
	taskObj: {
		taskNumber?: number;
		text?: string;
		id: string;
		status: "completed" | "uncompleted";
	};
	toggle: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ modal, toggle, taskObj }) => {
	const { mutate, error } = useUpdateTask();

	const handleUpdate = (taskDetails: {
		id: string;
		taskNumber: number;
		text: string;
	}) => {
		mutate(taskDetails);
	};

	return (
		<TaskModal
			type={"Update"}
			modal={modal}
			toggle={toggle}
			taskObj={taskObj}
			onSubmit={handleUpdate}
		/>
	);
};

export default EditTask;
