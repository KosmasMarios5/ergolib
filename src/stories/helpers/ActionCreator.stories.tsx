import React from 'react'
import { ActionCreator as ActionCreatorInterface } from '../../helpers/actionCreator'
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Title
} from '@storybook/addon-docs'

/**
 * An action creator defines an event to be used in your application.
 * Returns a function that should be called when an event is dispatched using
 * the `dispatch` redux method, passing payload data and parameters if any.
 */
export const ActionCreator = (_props: ActionCreatorInterface) => <div />

export default {
  title: 'Helpers/ActionCreator',
  component: ActionCreator,
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
