import React from 'react';
import {Story, Meta } from '@storybook/react/types-6-0';
import {AddItem, AddItemPropsType } from '../AddItem';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TDL/AddItem',
    component: AddItem
} as Meta;

const Template: Story<AddItemPropsType> = (args) => <AddItem {...args} />;

export const AddItemStories = Template.bind({});
    AddItemStories.args = {
        addItem: action("click add item form")
};