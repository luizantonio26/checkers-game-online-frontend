export class CreateUserModel {
    email: string
    password: string
    passwordConfirm: string
    first_name: string
    last_name: string
    nickname: string
    constructor(email: string, password: string, password_confirm: string, first_name: string, last_name: string, nickname: string) {
        this.first_name = first_name
        this.email = email
        this.password = password
        this.passwordConfirm = password_confirm
        this.last_name = last_name
        this.nickname = nickname
    }
}

export class UserModel {
    id: number
    email: string
    first_name: string
    last_name: string
    nickname: string
    constructor(id: number, email: string, first_name: string, last_name: string, nickname: string) {
        this.id = id
        this.email = email
        this.first_name = first_name
        this.last_name = last_name
        this.nickname = nickname
    }
}