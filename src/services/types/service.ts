import { Login } from "../../views/login/types/login"

export interface CurrentUser {
    branchId: number,
    username: string
}

export interface Auth {
    defaultDriver: string
    driver(driver?: string): any
    login(creds: Login): boolean | string
    logout(): void
}
