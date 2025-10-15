import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 * Provides reusable validation patterns
 */

/**
 * @summary
 * String validation (required)
 */
export const zString = z.string().min(1, 'stringRequired');

/**
 * @summary
 * Nullable string validation
 */
export const zNullableString = z.string().nullable();

/**
 * @summary
 * Name validation (max 100 characters)
 */
export const zName = z.string().min(1, 'nameRequired').max(100, 'nameMaxLength');

/**
 * @summary
 * Description validation (max 500 characters)
 */
export const zDescription = z.string().max(500, 'descriptionMaxLength');

/**
 * @summary
 * Nullable description validation
 */
export const zNullableDescription = z.string().max(500, 'descriptionMaxLength').nullable();

/**
 * @summary
 * Foreign key validation (positive integer)
 */
export const zFK = z.coerce.number().int().positive('foreignKeyInvalid');

/**
 * @summary
 * Nullable foreign key validation
 */
export const zNullableFK = z.coerce.number().int().positive('foreignKeyInvalid').nullable();

/**
 * @summary
 * Bit/Boolean validation (0 or 1)
 */
export const zBit = z.coerce.number().int().min(0).max(1);

/**
 * @summary
 * Date string validation (ISO format)
 */
export const zDateString = z.string().datetime('invalidDateFormat');

/**
 * @summary
 * Email validation
 */
export const zEmail = z.string().email('invalidEmail');

/**
 * @summary
 * Positive number validation
 */
export const zPositiveNumber = z.coerce.number().positive('numberMustBePositive');

/**
 * @summary
 * Non-negative number validation
 */
export const zNonNegativeNumber = z.coerce.number().nonnegative('numberMustBeNonNegative');
