import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import withMock from 'storybook-addon-mock'
import AddList, { AddListProps } from './AddList'

export default {
    title: 'Components/Board/AddList',
    component: AddList,
    decorators: [withMock],
} as Meta

const Template: Story<AddListProps> = (args: AddListProps) => <AddList {...args} />

export const Main = Template.bind({})
Main.args = {
    listIndex: 1,
}

Main.parameters = {
    mockData: [
        {
            url: 'http://localhost:3000/lists',
            method: 'POST',
            status: 200,
        },
    ],
}
