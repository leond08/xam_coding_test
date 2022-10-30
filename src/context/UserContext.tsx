import React from "react"
import { UserInterface } from "../models/types/user"
import UserModel from "../models/UserModel"

export interface UserProviderProps{
    children: React.ReactNode
}

export enum UserActionKind {
    SET_USER = "SET_USER",
    REMOVE_USER = "REMOVE_USER"
}

export interface UserAction {
    type: UserActionKind,
    payload?: UserInterface,
    userId?: number 
}

export interface UserState {
    users: UserInterface[],
    setUser(user: UserInterface): void,
    removeUser(userId: number): void,
}

const defaultValue = {
    users: [],
    setUser: (user: UserInterface) => {},
    removeUser: (userId: number) => {},
}

export const UserContext = React.createContext<UserState>(defaultValue)

export const UserProvider = ({ children }: UserProviderProps) => {
    const [state, dispatch] = React.useReducer(
        (prevState: { users: UserInterface[] }, action: UserAction) => {
            switch (action.type) {
                case UserActionKind.SET_USER:
                    prevState.users.push(action.payload as UserInterface)
                    return {
                       ...prevState
                    }

                case UserActionKind.REMOVE_USER:
                    let newUsers = prevState.users.filter((user: UserInterface, index: number) => index !== action.userId)
                    return {
                        users: newUsers
                    }
            }
        },
        // set default value
        {
          users: UserModel.all() // get users
        }
    )
      
    const userContext = React.useMemo(
        () => ({
          setUser: (user: UserInterface) => {
            dispatch({ type: UserActionKind.SET_USER, payload: user })
          },
          removeUser: (userId: number) => {
            dispatch({ type: UserActionKind.REMOVE_USER, userId: userId})
          },
          users: state.users
        }),
        [state]
    )

    return (
       <UserContext.Provider value={userContext}>
            {children}
       </UserContext.Provider>
    )
}

  