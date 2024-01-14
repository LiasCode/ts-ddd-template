/**
 * Represents a function that checks the connection and returns a promise that resolves to a boolean value.
 * @returns A promise that resolves to a boolean indicating the connection status.
 * if the connection is successful, the promise will resolve to true.
 * if the connection fails, the promise will resolve to false.
 */
export type CheckConnection = () => Promise<boolean>;
