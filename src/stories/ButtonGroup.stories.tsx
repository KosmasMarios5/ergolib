import React, { Fragment } from "react";
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { Button, Group } from '../components/button/button'

export default {
  title: 'Components/Button Group',
  component: Group,
  argTypes: {}
} as ComponentMeta<typeof Group>

const Template: ComponentStory<typeof Group> = (args) => <Group {...args} />

export const Example1 = Template.bind({})
Example1.args = {
  dense: 'false',
  size: 'md',
  children: (
    <Fragment>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </Fragment>
  )
}
