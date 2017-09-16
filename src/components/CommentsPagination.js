import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Comment from './Comment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {loadPageComments} from '../AC'
import Loader  from './Loader'
import {COMMENTS_PER_PAGE} from './../constants'

class CommentsPagination extends Component {
    static defaultProps = {
        page: PropTypes.number.isRequired
    }
    
    componentWillMount() {
        const {loadPageComments, page, comments} = this.props

        if (!comments.length) {
            loadPageComments(page)
        }
    }

    componentWillReceiveProps({loadPageComments, page, comments}) {

        if (!comments.length) {
            loadPageComments(page)
        }
    }

    render() {
        const {loading} = this.props

        if (loading) return <Loader />

        return (
            <div>
                {this.getCommentsItems()}
                {this.getPagination()}
            </div>
        )
    }

    getCommentsItems = () => {
        const {comments} = this.props

        return comments.length ? (
            <ul>
                {comments.map(id => <li key = {id}><Comment id = {id} /></li>)}
            </ul>
        ) : <h3>No comments yet</h3>
    }

    getPagination = () => {
        let pages = []
        for (let i = 1; i <= this.props.totalPages; i++) {
            pages.push(<Link key={i} to={`/comments/${(i == 1) ? '' : i}`} >page {i}</Link>)
        }
        return <div>{pages}</div>
    }
}


export default connect((state, ownProps) => {
    const comments = (state.comments.pages.get(ownProps.page)) ? state.comments.pages.get(ownProps.page) : []

    return {
        comments,
        totalPages: Math.ceil(state.comments.total / COMMENTS_PER_PAGE),
        loading: state.comments.loading
    }
}, { loadPageComments })(CommentsPagination)