import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import { CriticityLevel } from 'domains/board/enums/CriticityLevel'
import CardLabel, { CardLabelProps } from './CardLabel'

export default {
    title: 'Components/Board/Label',
    component: CardLabel,
    argTypes: {
        label: {
            control: { type: 'number' },
        },
    },
} as Meta

const Template: Story<CardLabelProps> = (args: CardLabelProps) => <CardLabel {...args} />

export const Low = Template.bind({})
Low.args = {
    label: CriticityLevel.LOW,
}

export const Medium = Template.bind({})
Medium.args = {
    label: CriticityLevel.MEDIUM,
}

export const High = Template.bind({})
High.args = {
    label: CriticityLevel.HIGH,
}
