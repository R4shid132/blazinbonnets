import { supabase } from '@/integrations/supabase/client';

export type LeadType = 'enquiry' | 'test_drive' | 'finance' | 'sell_car' | 'contact' | 'offer_unlock';

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  type: LeadType;
  vehicle_id?: string;
  vehicle_name?: string;
  source?: string;
  metadata?: Record<string, unknown>;
}

export async function submitLead(input: LeadInput) {
  const { error } = await supabase.from('leads').insert({
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    message: input.message?.trim() || null,
    type: input.type,
    vehicle_id: input.vehicle_id ?? null,
    vehicle_name: input.vehicle_name ?? null,
    source: input.source ?? (typeof window !== 'undefined' ? window.location.pathname : null),
    metadata: input.metadata ?? {},
  });
  if (error) throw error;
}
