import { UserInterface } from "./types/user"
import { users } from "../data/users_data"

/**
 * Model for user helps to retrieve users and find user 
 * 
 */
class UserModel {

    /**
     * Return all users
     * 
     * @returns 
     */
    static all(): UserInterface[] {
        return users
    }

    /**
     * Find user by branchId
     * 
     * @param branchId 
     * @returns 
     */
    static findById(branchId: number): UserInterface | undefined {
        return users.find(user => user.branchId === +branchId)
    }
}

export default UserModel