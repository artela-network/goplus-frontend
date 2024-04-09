import React, { HTMLProps, useCallback } from 'react'
export function ExternalLink({
    target = '_blank',
    href,
    rel = 'noopener noreferrer',
    ...rest
  }: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLAnchorElement>) => {
        // don't prevent default, don't redirect if it's a new tab
        if (target === '_blank' || event.ctrlKey || event.metaKey) {

        } else {
          event.preventDefault()
 
        }
      },
      [href, target]
    )
    return <a className={`styled_link`} target={target} rel={rel} href={href} onClick={handleClick} {...rest} />
  }