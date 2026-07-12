import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Phone, Mail, MessageSquare, Trash2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  type: string;
  status: string;
  vehicle_name: string | null;
  source: string | null;
  created_at: string;
}

const STATUSES = ['new', 'contacted', 'qualified', 'closed', 'lost'] as const;

export default function AdminPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const load = async () => {
    setLoading(true);
    const { data: sess } = await supabase.auth.getSession();
    if (!sess.session) { navigate('/auth', { replace: true }); return; }

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', sess.session.user.id)
      .eq('role', 'admin');
    const admin = (roles?.length ?? 0) > 0;
    setIsAdmin(admin);

    if (admin) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) toast.error(error.message);
      else setLeads((data ?? []) as Lead[]);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('leads').update({ status: status as any }).eq('id', id);
    if (error) return toast.error(error.message);
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this lead?')) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (error) return toast.error(error.message);
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const signOut = async () => { await supabase.auth.signOut(); navigate('/auth'); };

  if (loading) return <div className="min-h-screen pt-32 text-center text-muted-foreground">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen pt-32 px-4 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-3">Access Denied</h1>
        <p className="text-sm text-muted-foreground mb-6">Your account has no admin role. Grant it in the Cloud dashboard (Users → Tables → user_roles → insert row with your user id and role = admin).</p>
        <button onClick={signOut} className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-heading font-semibold text-sm">Sign out</button>
      </div>
    );
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);
  const counts = STATUSES.reduce<Record<string, number>>((acc, s) => ({ ...acc, [s]: leads.filter(l => l.status === s).length }), {});

  return (
    <div className="min-h-screen pt-24 pb-24 lg:pb-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-accent font-heading font-semibold text-xs tracking-widest uppercase">Admin</p>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Leads Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="p-2 border border-border rounded-md text-muted-foreground hover:text-primary"><RefreshCw className="w-4 h-4" /></button>
            <button onClick={signOut} className="flex items-center gap-1.5 px-3 py-2 border border-border rounded-md text-sm text-muted-foreground hover:text-primary"><LogOut className="w-4 h-4" /> Sign out</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 mb-6">
          <button onClick={() => setFilter('all')} className={`p-3 rounded-md border text-left ${filter==='all'?'border-primary bg-primary/10':'border-border gradient-card'}`}>
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-lg font-heading font-bold text-foreground">{leads.length}</div>
          </button>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`p-3 rounded-md border text-left capitalize ${filter===s?'border-primary bg-primary/10':'border-border gradient-card'}`}>
              <div className="text-xs text-muted-foreground">{s}</div>
              <div className="text-lg font-heading font-bold text-foreground">{counts[s]}</div>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No leads yet.</div>
        ) : (
          <div className="space-y-3">
            {filtered.map(l => (
              <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gradient-card rounded-lg border border-border p-4 md:p-5">
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-heading font-bold text-foreground">{l.name}</h3>
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-accent/20 text-accent font-heading font-semibold">{l.type.replace('_',' ')}</span>
                      {l.vehicle_name && <span className="text-xs text-muted-foreground">· {l.vehicle_name}</span>}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-secondary-foreground">
                      <a href={`tel:${l.phone}`} className="flex items-center gap-1 hover:text-primary"><Phone className="w-3.5 h-3.5" />{l.phone}</a>
                      {l.email && <a href={`mailto:${l.email}`} className="flex items-center gap-1 hover:text-primary"><Mail className="w-3.5 h-3.5" />{l.email}</a>}
                    </div>
                    {l.message && (
                      <div className="mt-2 flex gap-2 text-sm text-muted-foreground">
                        <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <p className="whitespace-pre-wrap">{l.message}</p>
                      </div>
                    )}
                    <p className="mt-2 text-[11px] text-muted-foreground">{new Date(l.created_at).toLocaleString('en-GB')} · {l.source ?? '—'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)} className="bg-muted text-sm rounded-md px-2 py-1.5 border border-border capitalize">
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button onClick={() => remove(l.id)} className="p-2 text-muted-foreground hover:text-primary"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
