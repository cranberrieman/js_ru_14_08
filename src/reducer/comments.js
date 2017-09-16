import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_PAGE_COMMENTS, START, SUCCESS } from '../constants'
import {arrToMap} from './utils'
import {OrderedMap, Record, Map} from 'immutable'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ReducerState = Record({
    entities: new OrderedMap({}),
    pages: new Map({}),
    loading: false,
    total: 0
})


export default (state = new ReducerState(), action) => {
    const { type, payload, response, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentRecord({...payload.comment, id: randomId}))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

        case LOAD_PAGE_COMMENTS + START:
            return state.set('loading', true)

        case LOAD_PAGE_COMMENTS + SUCCESS:
            return state
                .mergeIn(['entities'], arrToMap(response.records, CommentRecord))
                .setIn(['pages', payload.page], response.records.reduce((acc, comment) => {
                    return acc.concat(comment.id)
                }, []))
                .set('total', response.total)
                .set('loading', false)
    }

    return state
}