import React, { useState } from "react";
import CreateTask from "./CreateTask";
import Card from "./Card";
import {
	ButtonGroup,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";
import { useFilterContext } from "../context/FilterContext";

const TodoList: React.FC = () => {
	const {
		filterTasks,
		statusTasks,
		resetTasks,
		completed,
		uncompleted,
		sortTaskNumber,
		sortTaskStatus,
		sortTaskDate,
		sortTaskText,
		orderBy,
	} = useFilterContext();
	const [modal, setModal] = useState<boolean>(false);

	const toggle = () => {
		setModal(!modal);
	};

	return (
		<>
			<div className="headerlogo" />
			<div className="header text-center">
				<h3 className="text-blue">Tasks List</h3>
				<h4>Completed Tasks: {completed}</h4>
				<h4>Uncompleted Tasks: {uncompleted}</h4>
				<button
					className="btn btn-primary mt-2"
					onClick={() => setModal(true)}>
					Create Task
				</button>
				<div className="d-flex justify-content-center">
					<ButtonGroup className="my-2">
						<ButtonGroup>
							<UncontrolledDropdown>
								<DropdownToggle color="danger">
									Filter
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										onClick={() =>
											statusTasks("completed")
										}>
										Filter By Completed
									</DropdownItem>
									<DropdownItem
										onClick={() =>
											statusTasks("uncompleted")
										}>
										Filter By Uncompleted
									</DropdownItem>
									<DropdownItem onClick={resetTasks}>
										Show all tasks
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown>
								<DropdownToggle color="warning">
									Sort
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										onClick={() => sortTaskNumber()}>
										Sort By Task ID
									</DropdownItem>
									<DropdownItem
										onClick={() => sortTaskStatus()}>
										Sort By Task Status
									</DropdownItem>
									<DropdownItem
										onClick={() => sortTaskDate()}>
										Sort By Task Date
									</DropdownItem>
									<DropdownItem
										onClick={() => sortTaskText()}>
										Sort By Task Description
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
							<UncontrolledDropdown>
								<DropdownToggle color="success">
									Order By
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem
										onClick={() => orderBy("asc")}>
										ASC
									</DropdownItem>
									<DropdownItem
										onClick={() => orderBy("desc")}>
										DESC
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</ButtonGroup>
					</ButtonGroup>
				</div>
			</div>
			<div className="task-container">
				{filterTasks?.map((obj, index) => (
					<Card taskObj={obj} key={obj.id} />
				))}
			</div>
			<CreateTask toggle={toggle} modal={modal} />
		</>
	);
};

export default TodoList;
