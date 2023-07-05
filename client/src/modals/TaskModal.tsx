import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface TaskModalProps {
	type: string;
	modal: boolean;
	toggle: () => void;
	taskObj: {
		taskNumber?: number;
		text?: string;
		id: string;
		status?: "completed" | "uncompleted";
	};
	onSubmit: (taskObj: {
		id: string;
		taskNumber: number;
		text: string;
	}) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
	type,
	modal,
	toggle,
	taskObj,
	onSubmit,
}) => {
	const [taskNumber, setTaskNumber] = useState<number>(
		taskObj.taskNumber ?? 0
	);
	const [taskText, setTaskText] = useState<string>(taskObj.text ?? "");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		if (name === "taskNumber") {
			const parsedValue = parseInt(value);
			setTaskNumber(parsedValue);
		} else {
			setTaskText(value);
		}
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit({
			id: taskObj.id,
			taskNumber,
			text: taskText,
		});
		toggle();
	};

	return (
		<Modal isOpen={modal} toggle={toggle}>
			<ModalHeader toggle={toggle}>{type} Task</ModalHeader>
			<ModalBody>
				<div className="form-group">
					<label>Task Number</label>
					<input
						type="text"
						className="form-control"
						value={taskNumber}
						onChange={handleChange}
						name="taskNumber"
					/>
				</div>
				<div className="form-group">
					<label>Text</label>
					<textarea
						rows={5}
						className="form-control"
						value={taskText}
						onChange={handleChange}
						name="taskText"></textarea>
				</div>
			</ModalBody>
			<ModalFooter>
				<Button color="primary" onClick={handleFormSubmit}>
					{type}
				</Button>
				<Button color="secondary" onClick={toggle}>
					Cancel
				</Button>
			</ModalFooter>
		</Modal>
	);
};
