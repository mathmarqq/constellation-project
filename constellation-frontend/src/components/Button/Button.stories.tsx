import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from './Button'

export default {
    title: 'Components/Shared/Button',
    component: Button,
} as Meta

const Template: Story<ButtonProps> = (args: ButtonProps) => <Button {...args} />

export const Main = Template.bind({})
Main.args = { children: 'Button' }
