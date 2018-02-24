export const types = {
    FETCH_NIM: "FETCH_NIM"
};

export const initial = {
    nim: null
};

export default function (state = initial, action) {
    switch (action.type) {
        case `${types.FETCH_NIM}_SUCCESS`:
            console.log('action.payload ', action.payload[0])
            return {...state, nim: action.payload.data};
        default:
            return state;
    }
}

export const actions = {
    fetchNim: data => ({
        type: types.FETCH_NIM,
        payload: {
            request:{
                url:'https://api.coinmarketcap.com/v1/ticker/nimiq/'
            }
        }
    })
};
