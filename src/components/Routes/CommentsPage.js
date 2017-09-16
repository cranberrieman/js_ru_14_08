import React, { Component } from 'react'
import CommentsPagination from '../CommentsPagination'
import {Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {COMMENTS_PER_PAGE} from '../../constants'

class CommentsPage extends Component {
    static propTypes = {

    };

    render() {
        return (
            <div>
                <Route path={`${this.props.match.path}/:id`} children={this.getComments}/>
            </div>
        )
    }

    getComments = ({match}) => {
        let page = match && match.params && parseInt(match.params.id, 10)

        if (Number.isNaN(page) || page <= 0 || page > this.props.totalPages) {
            page = 1
        }

        return <CommentsPagination page={page} />
    }
}

export default connect(state => ({
    totalPages: Math.ceil(state.comments.total / COMMENTS_PER_PAGE)
}))(CommentsPage)