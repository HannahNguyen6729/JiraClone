const defaultState = {
    editedProject: {
        'id':0,
        'projectName': 'default',
        'creator': 'default',
        'description':'default',
        'categoryId':3
    },
}
export  const JiraDrawerContentReducer = (state = defaultState, action)=>{
    switch(action.type){
        case 'SHOW_EDITED_PROJECT':{
            state.editedProject = action.payload;
            return {...state}
        }
        default: {
            return {...state}
        }
    }
}