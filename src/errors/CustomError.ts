/**
 * Custom error class that fixes error names.
 */
export abstract class CustomError extends Error {

    /**
     * Construct a new CustomError
     * @param message The message to display in error.
     * @see {@link DependencyInjectionError} for usage
     */
    protected constructor(message?: string) {
        super(message);
        this.name = new.target.name;
    }
}