import React, { useState } from "react";
import EditTask from "./EditTask";
import { FormGroup, Label, Input } from "reactstrap";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useUpdateTask } from "../hooks/useUpdateTask";

interface CardProps {
	taskObj: {
		id: string;
		taskNumber: number;
		text: string;
		status: "completed" | "uncompleted";
		createdAt: Date;
	};
}

const Card: React.FC<CardProps> = ({ taskObj }) => {
	const [modal, setModal] = useState(false);
	const [taskStatus, setTaskStatus] = useState(
		taskObj.status === "completed"
	);

	const { mutate } = useDeleteTask();
	const { mutate: mutateUpdate } = useUpdateTask();

	const colors = [
		{
			primaryColor: "#5D93E1",
			secondaryColor: "#ECF3FC",
		},
		{
			primaryColor: "#5DC250",
			secondaryColor: "#F2FAF1",
		},
	];

	const cardColor = () => {
		if (taskObj.status === "completed") {
			return colors[1].primaryColor;
		} else {
			return colors[0].primaryColor;
		}
	};

	const toggle = () => {
		setModal(!modal);
	};

	const handleDelete = () => {
		const taskCredentials = { id: taskObj.id };
		mutate(taskCredentials);
	};

	const handleStatusToggle = () => {
		setTaskStatus((prevState) => !prevState);
		mutateUpdate({
			id: taskObj.id,
			status: taskStatus ? "uncompleted" : "completed",
		});
	};

	return (
		<div className="card-wrapper">
			<div
				className="card-top"
				style={{ backgroundColor: cardColor() }}></div>
			<div className="task-holder">
				<span className="card-header" style={{ borderRadius: "10px" }}>
					Task Number: #{taskObj.taskNumber}
				</span>
				<p className="mt-3">{taskObj.text}</p>
				<div
					style={{
						position: "absolute",
						right: "10px",
						bottom: "10px",
					}}>
					<i
						className="far fa-edit"
						style={{
							color: cardColor(),
							cursor: "pointer",
							marginRight: "10px",
						}}
						onClick={() => setModal(true)}></i>
					<i
						className="fas fa-trash-alt"
						style={{ color: cardColor(), cursor: "pointer" }}
						onClick={handleDelete}></i>
				</div>
				<FormGroup
					switch
					style={{
						position: "absolute",
						left: "10px",
						bottom: "10px",
					}}>
					<Input
						type="switch"
						checked={taskStatus}
						onChange={handleStatusToggle}
					/>
					<Label check disabled>
						{taskStatus ? "completed" : "uncompleted"}
					</Label>
					<Label check disabled style={{ marginLeft: "20px" }}>
						{new Date(taskObj.createdAt).toLocaleDateString()}
					</Label>
				</FormGroup>
			</div>
			<EditTask modal={modal} toggle={toggle} taskObj={taskObj} />
		</div>
	);
};

export default Card;
