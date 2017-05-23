import { compose, lifecycle } from 'recompose'
import { connect } from 'react-redux'
import { fetch } from '../store/sponsors'
import Footer from '../components/Footer'

function mapStateToProps(state) {
    return {
        sponsors: [],
    }
}

export default compose(
    connect(mapStateToProps, { fetch }),
    lifecycle({
        componentDidMount() {
            // this.props.fetch()
        },
    })
)(Footer)
