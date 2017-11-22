export const USER_INFO_INPUT_CHANGE = 'USER_INFO_INPUT_CHANGE';

export function userNameInfoInputChange(input)  {
    return {
        type: USER_INFO_INPUT_CHANGE,
        input
    }
}