import React from 'react';
import {Story, Meta } from '@storybook/react/types-6-0';
import {AppWithRedux} from '../AppWithRedux';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'TDL/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <AppWithRedux/>

export const AppWithReduxStories = Template.bind({});
AppWithReduxStories.args = {};