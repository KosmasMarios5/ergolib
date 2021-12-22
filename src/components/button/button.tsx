import React from 'react'
import './button.css'
import classNames from 'classnames'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Wrapper instead of the default html element
   */
  component?: keyof JSX.IntrinsicElements
  /**
   * Default styling of the button
   */
  variant?: 'action' | 'link' | 'default' | 'outlined'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

/**
 * A button is a simple ui element a user can interact with.
 */
export const Button = (props: ButtonProps) => {
  const { variant, size, type, component, children, disabled, ...otherProps } =
    props
  const Component = component as 'button'
  return (
    <Component
      {...otherProps}
      disabled={disabled}
      type={type}
      className={classNames('button', props.className, {
        ['button--' + size]: Boolean(size),
        ['button--' + variant]: Boolean(variant),
        'button--disabled': disabled
      })}
    >
      <div className='button__main'>{children}</div>
    </Component>
  )
}

Button.defaultProps = {
  component: 'button',
  variant: 'default',
  size: 'md'
}

interface GroupProps extends React.ButtonHTMLAttributes<HTMLElement> {
  /**
   * All buttons will respect the size defined by the group.
   */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /**
   * If true then the spacing between the buttons will be removed.
   */
  dense?: boolean
  /**
   * If true then the border radius of inner buttons will be removed.
   */
  collapsed?: boolean
  /**
   * If true the buttons will expand equally to fill up the available space.
   */
  expandedButtons?: boolean
  spacingTop?: 1 | 2
  spacingBelow?: 1 | 2
}

/**
 * A button group can be used to combine multiple buttons under a single container.
 */
export const Group = (props: GroupProps) => {
  const {
    children,
    size,
    className,
    spacingTop,
    spacingBelow,
    dense,
    collapsed,
    expandedButtons
  } = props
  return (
    <div
      className={classNames('button-group', className, {
        'button-group--dense': dense,
        'button-group--collapsed': collapsed,
        'button-group--expandedButtons': expandedButtons,
        ['button-group--' + size]: Boolean(size),
        ['button-group--spacing-top-' + spacingTop]: Boolean(spacingTop),
        ['button-group--spacing-below-' + spacingBelow]: Boolean(spacingBelow)
      })}
    >
      {children}
    </div>
  )
}

Button.Group = Group

export default Button
