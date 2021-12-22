import React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button, Group } from '../components/button/button'

export default {
  title: 'Components/Button Group',
  component: Group,
  argTypes: {}
} as ComponentMeta<typeof Group>

const Template: ComponentStory<typeof Group> = (args) => (
  <>
    <Group {...args}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Group>
    <Group {...args}>
      <Button>Save</Button>
      <Button variant='link'>Cancel</Button>
    </Group>
  </>
)

export const Example1 = Template.bind({})
Example1.args = {
  size: 'md',
  spacingBelow: 1
}
