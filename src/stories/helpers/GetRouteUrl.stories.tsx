import React from 'react'
import { RouteUrl as RouteUrlInterface } from "../../helpers/getRouteUrl";
import {
  ArgsTable,
  Description,
  PRIMARY_STORY,
  Title
} from '@storybook/addon-docs'

// noinspection JSUnusedLocalSymbols
/**
 * Constructs a url to the supplied route.
 */
export const GetRouteUrl = (props: RouteUrlInterface) => <div />

export default {
  title: 'Helpers/GetRouteUrl',
  component: GetRouteUrl,
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
