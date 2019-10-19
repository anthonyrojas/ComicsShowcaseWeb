export const isNullOrUndefined = (data) => {
    return (data === undefined || data === null);
}
export const isEmptyOrNullOrUndefined = (data) => {
    return (data === undefined || data === null || data.trim() === '');
}
export const isEmptyArray = (data) => {
    return (Array.isArray(data) && data.length <= 0)
}