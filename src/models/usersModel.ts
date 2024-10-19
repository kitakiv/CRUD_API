import usersJson from '../data/users.json'
import {
    UserObject,
    HttpCode,
    Response,
    ErrorUser,
} from '../interface/interface'
import { validate as isUUID, v4 as uuid } from 'uuid'

class UsersModel {
    private users: UserObject[]

    constructor() {
        this.users = (usersJson as UserObject[]) || []
    }
    public getAllUsers(): Promise<Response> {
        return Promise.resolve({ statusCode: HttpCode.OK, body: this.users })
    }

    public getUserById(userId: string): Promise<Response> {
        if (isUUID(userId)) {
            const user = this.users.find((user) => user.id === userId)
            if (user) {
                return Promise.resolve({ statusCode: HttpCode.OK, body: user })
            } else {
                return Promise.resolve({
                    statusCode: HttpCode.NOT_FOUND,
                    body: { error: ErrorUser.USER_NOT_FOUND },
                })
            }
        } else {
            return Promise.resolve({
                statusCode: HttpCode.BAD_REQUEST,
                body: { error: ErrorUser.USER_NOT_FOUND },
            })
        }
    }

    public checkUserType(user: unknown): boolean {
        if (user && typeof user === 'object') {
            if ('username' in user && 'age' in user && 'hobbies' in user) {
                if (
                    typeof user.username === 'string' &&
                    typeof user.age === 'number' &&
                    Array.isArray(user.hobbies)
                ) {
                    if (user.hobbies.every((hobby) => typeof hobby === 'string')) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        }
        return false
    }

    public createUser(user: unknown): Promise<Response> {
        if (this.checkUserType(user)) {
            const userCreated = user as UserObject
            const newUser: UserObject = {
                ...userCreated,
                id: uuid(),
            }
            this.users.push(newUser)
            return Promise.resolve({ statusCode: HttpCode.CREATED, body: newUser })
        } else {
            return Promise.resolve({
                statusCode: HttpCode.BAD_REQUEST,
                body: { error: ErrorUser.USER_NOT_SAVED },
            })
        }
    }

    public updateUser(userId: string, user: unknown): Promise<Response> {
        if (isUUID(userId)) {
            if (this.checkUserType(user)) {
                const userUpdated = user as UserObject
                const index = this.users.findIndex((user) => user.id === userId)
                if (index !== -1) {
                    this.users[index] = {
                        id: this.users[index].id,
                        ...userUpdated,
                    }
                    return Promise.resolve({
                        statusCode: HttpCode.CREATED,
                        body: this.users[index],
                    })
                } else {
                    return Promise.resolve({
                        statusCode: HttpCode.NOT_FOUND,
                        body: { error: ErrorUser.USER_NOT_FOUND },
                    })
                }
            } else {
                return Promise.resolve({
                    statusCode: HttpCode.BAD_REQUEST,
                    body: { error: ErrorUser.USER_NOT_UPDATED },
                })
            }
        }
        return Promise.resolve({
            statusCode: HttpCode.BAD_REQUEST,
            body: { error: ErrorUser.USER_NOT_UPDATED },
        })
    }

    public deleteUser(userId: string): Promise<Response> {
        if (isUUID(userId)) {
            const index = this.users.findIndex((user) => user.id === userId)
            if (index !== -1) {
                this.users.splice(index, 1)
                return Promise.resolve({
                    statusCode: HttpCode.NO_CONTENT,
                    body: { message: 'User deleted successfully' },
                })
            } else {
                return Promise.resolve({
                    statusCode: HttpCode.NOT_FOUND,
                    body: { error: ErrorUser.USER_NOT_FOUND },
                })
            }
        } else {
            return Promise.resolve({
                statusCode: HttpCode.BAD_REQUEST,
                body: { error: ErrorUser.USER_NOT_FOUND },
            })
        }
    }
}

export default UsersModel
