import { z } from 'zod';

const paymentsConfigSchema = z.object({
  // Stripe Configuration
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // PayPal Configuration
  PAYPAL_CLIENT_ID: z.string().optional(),
  PAYPAL_CLIENT_SECRET: z.string().optional(),
  PAYPAL_MODE: z.enum(['sandbox', 'live']).default('sandbox'),
  
  // General Payment Settings
  CURRENCY: z.string().default('USD'),
  TAX_RATE: z.number().min(0).max(1).default(0.1), // 10% tax
  PROCESSING_FEE_PERCENTAGE: z.number().min(0).max(1).default(0.029), // 2.9%
  PROCESSING_FEE_FIXED: z.number().min(0).default(0.30), // $0.30
  
  // Subscription Settings
  TRIAL_PERIOD_DAYS: z.number().default(14),
  GRACE_PERIOD_DAYS: z.number().default(3),
  
  // Refund Settings
  REFUND_WINDOW_DAYS: z.number().default(30),
  PARTIAL_REFUND_ALLOWED: z.boolean().default(true),
  
  // Invoice Settings
  INVOICE_PREFIX: z.string().default('INV'),
  INVOICE_NUMBER_LENGTH: z.number().default(8),
  
  // Webhook Settings
  WEBHOOK_TIMEOUT: z.number().default(30000), // 30 seconds
  WEBHOOK_RETRY_ATTEMPTS: z.number().default(3),
});

export type PaymentsConfig = z.infer<typeof paymentsConfigSchema>;

export const paymentsConfig: PaymentsConfig = {
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET,
  PAYPAL_MODE: (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
  
  CURRENCY: process.env.CURRENCY || 'USD',
  TAX_RATE: parseFloat(process.env.TAX_RATE || '0.1'),
  PROCESSING_FEE_PERCENTAGE: parseFloat(process.env.PROCESSING_FEE_PERCENTAGE || '0.029'),
  PROCESSING_FEE_FIXED: parseFloat(process.env.PROCESSING_FEE_FIXED || '0.30'),
  
  TRIAL_PERIOD_DAYS: parseInt(process.env.TRIAL_PERIOD_DAYS || '14'),
  GRACE_PERIOD_DAYS: parseInt(process.env.GRACE_PERIOD_DAYS || '3'),
  
  REFUND_WINDOW_DAYS: parseInt(process.env.REFUND_WINDOW_DAYS || '30'),
  PARTIAL_REFUND_ALLOWED: process.env.PARTIAL_REFUND_ALLOWED === 'true',
  
  INVOICE_PREFIX: process.env.INVOICE_PREFIX || 'INV',
  INVOICE_NUMBER_LENGTH: parseInt(process.env.INVOICE_NUMBER_LENGTH || '8'),
  
  WEBHOOK_TIMEOUT: parseInt(process.env.WEBHOOK_TIMEOUT || '30000'),
  WEBHOOK_RETRY_ATTEMPTS: parseInt(process.env.WEBHOOK_RETRY_ATTEMPTS || '3'),
};

// Validate configuration on startup
try {
  paymentsConfigSchema.parse(paymentsConfig);
} catch (error) {
  console.error('❌ Invalid payments configuration:', error);
  process.exit(1);
}
