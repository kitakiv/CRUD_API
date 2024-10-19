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

export enum ErrorUser {
    USER_NOT_FOUND = "USER_NOT_FOUND",
    USER_NOT_SAVED = "USER_NOT_SAVED",
    USER_NOT_UPDATED = "USER_NOT_UPDATED",
}

export interface UserObject {
    id?: string;
    username: string;
    age: number;
    hobbies: string[];
}