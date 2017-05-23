import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { fetch } from '../store/menus'
import Navbar from '../components/Navbar'

function mapStateToProps(state) {
    return {
        menus: state.menus.data,
    }
}

export default compose(
    connect(mapStateToProps, { fetch }),
    lifecycle({
        componentDidMount() {
            this.props.fetch()
        },
    })
)(Navbar)
