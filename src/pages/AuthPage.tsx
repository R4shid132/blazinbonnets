import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/admin', { replace: true });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Signed in');
        navigate('/admin', { replace: true });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success('Account created. If email confirmation is on, check your inbox.');
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const input = 'w-full bg-muted text-foreground text-sm rounded-md px-4 py-3 border border-border focus:border-primary focus:outline-none';

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md gradient-card rounded-xl border border-border p-8 shadow-luxury">
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5 text-accent" />
          <h1 className="text-xl font-heading font-bold text-foreground">Admin Portal</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className={input} autoComplete="email" />
          <input required type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className={input} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} minLength={6} />
          <button disabled={loading} type="submit" className="w-full py-3 bg-primary text-primary-foreground font-heading font-semibold rounded-md hover:glow-red transition disabled:opacity-60">
            {loading ? '...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        <button onClick={() => setMode(m => m === 'signin' ? 'signup' : 'signin')} className="mt-4 w-full text-xs text-muted-foreground hover:text-primary">
          {mode === 'signin' ? "First time? Create the first admin account" : 'Have an account? Sign in'}
        </button>
        <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed">
          After creating your first account, your admin role must be granted in the Cloud dashboard (Users → user_roles table) before you can view leads.
        </p>
      </motion.div>
    </div>
  );
}
