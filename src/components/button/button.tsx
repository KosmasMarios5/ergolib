import React from 'react'
import './button.css'
import classNames from 'classnames'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  component?: keyof JSX.IntrinsicElements
  noAction?: boolean
  outlined?: boolean
  /**
   * Is this the principal call to action on the page?
   */
  variant?: 'action' | 'link' | 'default'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

/**
 * General component description.
 */
const Button: React.FC<ButtonProps> = (props) => {
  const {
    noAction,
    outlined,
    variant,
    size,
    type,
    component,
    children,
    disabled,
    ...otherProps
  } = props
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
        'button--no-action': noAction,
        'button--outlined': outlined
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

// type GroupProps = {
//   children?: React.Node,
//   size?: 'xs' | 'sm' | 'md' | 'lg',
//   spacingTop?: 1 | 2,
//   spacingBelow?: 1 | 2,
//   className?: string,
//   dense?: boolean,
//   expandedButtons?: boolean
// }
//
// const Group = (props: GroupProps) => {
//   const {
//     children,
//     size,
//     className,
//     spacingTop,
//     spacingBelow,
//     dense,
//     expandedButtons
//   } = props
//   return (
//     <div
//       className={classNames('button-group', className, {
//         'button-group--dense': dense,
//         'button-group--expandedButtons': expandedButtons,
//         ['button-group--' + size]: Boolean(size),
//         ['button-group--spacing-top-' + spacingTop]: Boolean(spacingTop),
//         ['button-group--spacing-below-' + spacingBelow]: Boolean(spacingBelow)
//       })}
//     >
//       {children}
//     </div>
//   )
// }
//
// Button.Group = Group

export default Button
