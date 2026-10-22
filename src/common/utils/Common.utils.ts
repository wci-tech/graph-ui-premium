
/**
 * Determines whether a value is a non-null, non-array object.
 *
 * @param value - Value to evaluate.
 * @returns Whether the value is a string-keyed record.
 */
export const isRecord = (
    value: unknown,
): value is Record<string, unknown> =>
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value);

/**
 * Determines whether a value is an array containing only strings.
 *
 * @param value - Value to evaluate.
 * @returns Whether the value is a string array.
 */
export const isStringArray = (
    value: unknown,
): value is string[] =>
    Array.isArray(value) &&
    value.every((item) => typeof item === 'string');

/**
 * Determines whether a value is an array containing only numbers.
 *
 * @param value - Value to evaluate.
 * @returns Whether the value is a number array.
 */
export const isNumberArray = (
    value: unknown,
): value is number[] =>
    Array.isArray(value) &&
    value.every((item) => typeof item === 'number');