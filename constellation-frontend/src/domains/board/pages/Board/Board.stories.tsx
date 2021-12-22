import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Board from './Board'

export default {
    title: 'Components/Board/Page',
    component: Board,
} as Meta

const Template: Story = () => <Board />

export const Main = Template.bind({})
Main.args = {}
