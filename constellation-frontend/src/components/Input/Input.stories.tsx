import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Input, { InputProps } from './Input'

export default {
    title: 'Components/Shared/Input',
    component: Input,
} as Meta

const Template: Story<InputProps> = (args: InputProps) => <Input {...args} />

export const Main = Template.bind({})

Main.args = { placeholder: 'Placeholder' }
