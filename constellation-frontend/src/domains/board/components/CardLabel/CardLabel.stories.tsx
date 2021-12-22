import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import CardLabel, { CardLabelProps } from './CardLabel'

export default {
    title: 'Components/Board/Label',
    component: CardLabel,
} as Meta

const Template: Story<CardLabelProps> = (args: CardLabelProps) => <CardLabel {...args} />

export const Main = Template.bind({})
Main.args = {
    label: CriticityLevel.MEDIUM,
}
