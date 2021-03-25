import React from 'react';
import {Story, Meta } from '@storybook/react/types-6-0';
import {EditableSpan, EditableSpanPropsType } from '../EditableSpan';
import {action} from "@storybook/addon-actions";

export default {
    title: 'TDL/EditableSpan',
    component: EditableSpan,
    argTypes: {
        value: {
            defaultValue:"react"
        }
    }
} as Meta;

let changeItem = action("changeItem")

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanStories = Template.bind({});
EditableSpanStories.args = {
    title: "title",
    changeItem
};