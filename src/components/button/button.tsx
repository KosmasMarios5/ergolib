import React from 'react'
import './button.css'
import classNames from 'classnames'

/** @inheritdoc */
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
 * General component description.
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
        'button--disabled': disabled,
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
  size?: 'xs' | 'sm' | 'md' | 'lg'
  spacingTop?: 1 | 2
  spacingBelow?: 1 | 2
  className?: string
  dense?: boolean
  expandedButtons?: boolean
}

export const Group = (props: GroupProps) => {
  const {
    children,
    size,
    className,
    spacingTop,
    spacingBelow,
    dense,
    expandedButtons
  } = props
  return (
    <div
      className={classNames('button-group', className, {
        'button-group--dense': dense,
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
