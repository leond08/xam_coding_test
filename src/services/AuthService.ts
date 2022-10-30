import MESSAGES from "../helpers/message"
import { UserInterface } from "../models/types/user"
import UserModel from "../models/UserModel"
import { Login } from "../views/login/types/login"
import Driver from "./driver/Driver"
import LocalStorage from "./driver/LocalStorage"
import SessionStorage from "./driver/SessionStorage"
import { Auth, CurrentUser } from "./types/service"

/**
 * Authentication service that handles authentication, saving current user
 * 
 */
class AuthService implements Auth {
    defaultDriver: string = 'local'
    protected _driver: Driver = new LocalStorage()

    constructor() {
        this.driver()
    }

    /**
     * Get logged-in user
     * 
     * @returns
     */
    getCurrentUser(): CurrentUser {
        return this._driver.getItem('currentUser') as CurrentUser
    }

    /**
     * Set the storage supported driver are session storage and local storage
     * 
     * @param driver option session | local
     * @returns 
     */
    public driver(driver?: string) {
        let _driver = driver ? driver : this.defaultDriver
        switch (_driver) {
            case 'local':
                this._driver = new LocalStorage()
                break

            case 'session':
                this._driver = new SessionStorage()
                break
        
            default:
                throw new Error('unsupported driver.')
        }

        return this
    }

    /**
     * Initiate login user to the system
     * 
     * @param creds 
     * @returns 
     */
    public login(creds: Login) {
        let user: UserInterface | undefined = UserModel.findById(creds.branchId)

        if (user) {
            if (user.userName !== creds.username) {
                return MESSAGES.LOGIN_USERNAME_INCORRECT
            }
            else if (user.password !== creds.password) {
                return MESSAGES.LOGIN_PASSWORD_INCORRECT
            }

            // save the username, branchId in the storage
            this._driver.save("currentUser", {
                username: creds.username,
                branchId: creds.branchId
            })
            
            return true
        }
        else {
            return MESSAGES.LOGIN_BRANCH_ID_INCORRECT
        }
    }

    /**
     * Logout user and clear the data save on storage
     * 
     */
    public logout() {
        this._driver.clear()
    }
}

export default new AuthService()