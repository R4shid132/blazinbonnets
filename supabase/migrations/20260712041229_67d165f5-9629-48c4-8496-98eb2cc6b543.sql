
ALTER FUNCTION public.tg_leads_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;

DROP POLICY IF EXISTS "anyone can submit a lead" ON public.leads;
CREATE POLICY "anyone can submit a lead" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 120
    AND length(trim(phone)) BETWEEN 6 AND 40
    AND (message IS NULL OR length(message) <= 2000)
  );
