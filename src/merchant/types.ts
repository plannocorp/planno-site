export type MethodType = 'FIXED' | 'PICKUP' | 'MELHOR_ENVIO' | 'CORREIOS'
export type Provider = 'MELHOR_ENVIO' | 'CORREIOS'
export interface User { userId: string; email: string; firstName?: string; roles: string[]; storeIds: string[]; mustChangePassword: boolean }
export interface Auth extends User { accessToken: string }
export interface Store { id: string; name: string; slug: string }
export interface MethodOptions {
  postalCodeFrom: string | null; postalCodeTo: string | null; pickupAddress: string | null;
  pickupHours: string | null; instructions: string | null; serviceCode: string | null; declaredValueServiceCode: string | null;
}
export interface ShippingMethod { id: string; name: string; type: MethodType; price: number; estimatedDays: number; active: boolean; options: MethodOptions | null }
export type MethodInput = Omit<ShippingMethod, 'id'>
export interface Integration { provider: Provider; originPostalCode: string | null; sandbox: boolean; enabled: boolean; credentialsConfigured: boolean; contractCode: string | null; postingCard: string | null; contractRegional: number | null }
export interface IntegrationInput { originPostalCode: string; sandbox: boolean; enabled: boolean; accessToken?: string; username?: string; accessCode?: string; contractCode?: string; postingCard?: string; contractRegional?: number }
export interface ShippingPackage { weightKg: number; widthCm: number; heightCm: number; lengthCm: number }
export interface Product { id: string; name: string; sku: string; status: string; shippingPackage: ShippingPackage | null }
export type ApiCall = <T>(path: string, options?: { method?: string; body?: unknown; signal?: AbortSignal }) => Promise<T>
