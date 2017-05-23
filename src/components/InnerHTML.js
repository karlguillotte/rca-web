import { createElement } from 'react'
import PropTypes from 'prop-types'

InnerHTML.propTypes = {
    children: PropTypes.string,
    component: PropTypes.string,
}

export default function InnerHTML({ children, component = 'div', ...props }) {
    if (!children) {
        return null
    }

    return createElement(component, {
        ...props,
        dangerouslySetInnerHTML: {
            __html: children,
        },
    })
}
