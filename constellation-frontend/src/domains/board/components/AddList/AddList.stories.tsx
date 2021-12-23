import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import AddList, { AddListProps } from './AddList'

export default {
    title: 'Components/Board/AddList',
    component: AddList,
} as Meta

const Template: Story<AddListProps> = (args: AddListProps) => <AddList {...args} />

export const Main = Template.bind({})
Main.args = {
    listIndex: 1,
}
