import { createContext, useContext, useReducer, useMemo } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
const MyContext = createContext ()
MyContext.displayName = "MyContextContext"
function reducer(state, action){
    switch (action.type){
        case "USER_LOGIN":{
            return {...state, userLogin: action.value}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function MyContextControllerProvider ({children}) {
    const initialState = {
        userLogin: null
    }
    const [controller, dispatch] = useReducer(reducer, initialState)
    const value = useMemo(()=>[controller, dispatch], [controller, dispatch])
    return <MyContext.Provider value={value}>{children}</MyContext.Provider>
}

function useMyContextController(){
    const context = useContext(MyContext)
    if (!context){
        throw new Error ("useMyContextController should be used inside the MyContextControllerProvider")
    }
    return context
}

const USER = firestore().collection("USERS")
const SERVICES = firestore().collection("SERVICES")

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email,password)
    .then(()=>
        USER.doc(email)
        .onSnapshot(u => {
            const value = u.data()
            console.log("Success! Hello ", value)
            dispatch({type:"USER_LOGIN", value})
        }))
    .catch(e => alert("User or Password may be wrong"))
}

const logout = (dispatch) => {
    dispatch({type:"USER_LOGIN", value:null})
}

const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp()
    SERVICES.add(newService)
    .then(()=> alert("Add new service!"))
    .catch((e) => alert(e))
}

export {
    MyContextControllerProvider,
    useMyContextController,
    login,
    logout,
    createNewService
}