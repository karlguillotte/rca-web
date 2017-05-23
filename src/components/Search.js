import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Search.css'

export default class Search extends PureComponent {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        value: PropTypes.string,
    }
    handleSubmit = event => {
        event.preventDefault()
        this.props.onSubmit(event.target.elements.q.value)
    }
    render() {
        return (
            <form className="Search" onSubmit={this.handleSubmit}>
                <input
                    placeholder="Type something you want to search for..."
                    name="q"
                    type="search"
                    defaultValue={this.props.value}
                />
                <button>Go</button>
            </form>
        )
    }
}
