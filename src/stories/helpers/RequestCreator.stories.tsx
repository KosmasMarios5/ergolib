import React from 'react'
import { Request as RequestInterface } from '../../helpers/requestCreator'
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Title
} from '@storybook/addon-docs'

// noinspection JSUnusedLocalSymbols
/**
 * Defines an API request or a side effect that should be triggered every
 * time an event is dispatched.
 */
export const RequestCreator = (props: RequestInterface) => <div />

export default {
  title: 'Helpers/RequestCreator',
  component: RequestCreator,
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
