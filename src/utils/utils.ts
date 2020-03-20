import { Store } from 'vuex';
import BoardState from '@/store/BoardState';

/**
 * generates a unique id
 */
export function uuid(): string {
    return Math.random().toString(16).slice(2);
}

/**
 * subscribes to the store to save the local state of the board to local storage
 * @param store the the Vuex Store
 */
export function saveStatePlugin(store: Store<BoardState>) {
    store.subscribe((_mutation, state) => {
        localStorage.setItem('board', JSON.stringify(state.board))
    })
}
