import React from 'react'
import { Route as RouteInterface } from '../../helpers/routeCreator'
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Title
} from '@storybook/addon-docs'
/**
 * A route creator defines an internal application route.
 * @see https://reactrouter.com/
 */
export const RouteCreator = (_props: RouteInterface) => <div />

export default {
  title: 'Helpers/RouteCreator',
  component: RouteCreator,
  parameters: {
    viewMode: 'docs',
    previewTabs: {
      canvas: { hidden: true }
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Description />
          <ArgsTable story={PRIMARY_STORY} />
        </>
      )
    }
  },
  argTypes: {}
}
