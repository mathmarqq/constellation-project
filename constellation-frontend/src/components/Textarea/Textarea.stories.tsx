import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import Textarea, { TextareaProps } from './Textarea'

export default {
    title: 'Components/Shared/Textarea',
    component: Textarea,
} as Meta

const Template: Story<TextareaProps> = (args: TextareaProps) => <Textarea {...args} />

export const Main = Template.bind({})

Main.args = { placeholder: 'Placeholder' }
