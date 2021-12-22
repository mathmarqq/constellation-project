import React from 'react'
import { Story } from '@storybook/react'
import { Meta } from '@storybook/react/types-6-0'

import ConfirmationModal, { ConfirmationModalProps } from './ConfirmationModal'

export default {
    title: 'Components/Shared/ConfirmationModal',
    component: ConfirmationModal,
} as Meta

const Template: Story<ConfirmationModalProps> = (args: ConfirmationModalProps) => (
    <ConfirmationModal {...args} />
)

export const Main = Template.bind({})
Main.args = {
    title: 'title',
    description: 'description',
    continueButtonText: 'Continue',
    closeButtonText: 'Close',
    onContinue: () => {},
    onClose: () => {},
}
