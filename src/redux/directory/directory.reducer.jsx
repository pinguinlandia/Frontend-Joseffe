const INITIAL_STATE = {
    sections: [
        {
            title: "Promoções",
            imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
            size: "large",
            id: 1,
            linkUrl: "shop"
        },
        {
            title: "Descontos",
            imageUrl: "https://i.ibb.co/X2VJP2W/blue-snapback.png",
            size: "large",
            id: 2,
            linkUrl: "shop"
        }
    ]
}
const directoryReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        default:
            return state
    }
}

export default directoryReducer