import React from 'react';
import {Story, Meta } from '@storybook/react/types-6-0';
import {Task, TaskPropsType } from '../components/Task';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TDL/Task',
    component: Task
} as Meta;

let removeTask = action("removeTask")
let changeStatus = action("changeStatus")
let changeTaskTitle = action("changeTaskTitle")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

let baseArgs = {
    removeTask,
    changeStatus,
    changeTaskTitle
}

export const TaskStories = Template.bind({});
TaskStories.args = {
    ...baseArgs,
    task: {id: "1", title: "isDone = true", isDone: true},
    blockId: "blockId"
};
export const TaskStories2 = Template.bind({});
TaskStories2.args = {
    ...baseArgs,
    task: {id: "2", title: "isDone = false", isDone: false},
    blockId: "blockId"
};