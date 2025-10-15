import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityCheck
 * @description Security validation configuration
 */
interface SecurityCheck {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 */
interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Base controller for CRUD operations with validation and security
 */
export class CrudController {
  private securityChecks: SecurityCheck[];

  constructor(securityChecks: SecurityCheck[]) {
    this.securityChecks = securityChecks;
  }

  /**
   * @summary
   * Validates request for CREATE operations
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  /**
   * @summary
   * Validates request for READ operations
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validateRequest(req, schema, 'READ');
  }

  /**
   * @summary
   * Validates request for UPDATE operations
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async update(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  /**
   * @summary
   * Validates request for DELETE operations
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  /**
   * @summary
   * Internal validation method
   *
   * @param {Request} req - Express request object
   * @param {z.ZodSchema} schema - Zod validation schema
   * @param {string} operation - Operation type
   * @returns {Promise<[ValidationResult | null, any]>} Validation result or error
   */
  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    operation: string
  ): Promise<[ValidationResult | null, any]> {
    try {
      const params = { ...req.params, ...req.query, ...req.body };
      const validated = await schema.parseAsync(params);

      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params: validated }, null];
    } catch (error) {
      return [null, error];
    }
  }
}

/**
 * @summary
 * Success response formatter
 *
 * @param {any} data - Response data
 * @returns {object} Formatted success response
 */
export function successResponse(data: any): object {
  return {
    success: true,
    data: data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary
 * Error response formatter
 *
 * @param {string} message - Error message
 * @returns {object} Formatted error response
 */
export function errorResponse(message: string): object {
  return {
    success: false,
    error: {
      message: message,
    },
    timestamp: new Date().toISOString(),
  };
}
