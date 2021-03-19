/**
 * Custom error class that fixes error names.
 */
export class CustomError extends Error {

    /**
     * @param message The message to display in error.
     */
    constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }
}