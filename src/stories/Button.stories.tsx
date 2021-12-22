import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import Button from '../components/button/button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {}
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'action',
  children: 'Button'
}
