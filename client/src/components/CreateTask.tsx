import React from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { TaskModal } from "../modals/TaskModal";

interface CreateTaskProps {
	modal: boolean;
	toggle: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ modal, toggle }) => {
	const { mutate } = useCreateTask();

	const handleCreate = (taskDetails: {
		taskNumber: number;
		text: string;
	}) => {
		mutate({
			taskNumber: taskDetails.taskNumber,
			text: taskDetails.text,
			status: "uncompleted",
		});
	};

	return (
		<TaskModal
			type={"Create"}
			modal={modal}
			toggle={toggle}
			taskObj={{
				taskNumber: 0,
				text: "",
				id: "",
				status: "uncompleted",
			}}
			onSubmit={handleCreate}
		/>
	);
};

export default CreateTask;
