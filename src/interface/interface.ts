export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

export interface ResponseUser {
    statusCode: HttpCode;
    body?: unknown;
}

export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum UrlUsers {
    ALL = "/api/users",
    ALL_ID = "/api/users/",
}

export enum ErrorUser {
    USER_NOT_FOUND = "User not found",
    USER_NOT_SAVED = "USER_NOT_SAVED",
    USER_NOT_UPDATED = "USER_NOT_UPDATED",
    INCORRECT_ID = "incorrect user id",
    INCORRECT_TYPE = "incorrect user type or missing fields",
    INCORRECT_ROUTE = "incorrect route use /api/users or /api/users/:id",
}

export interface UserObject {
    id?: string;
    username: string;
    age: number;
    hobbies: string[];
}