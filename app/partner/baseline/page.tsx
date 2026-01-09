'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BaselinePage() {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<any[]>([]);
  const [newRole, setNewRole] = useState({ role_title: '', annual_salary: '', baseline_retention_percent: '52' });

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partner } = await supabase.from('partners').select('*').eq('is_employment_partner', true).limit(1).single();
        if (partner) {
          const { data } = await supabase.from('partner_baselines').select('*').eq('partner_id', partner.id);
          if (data) setRoles(data);
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Baseline Role Data</h1>
        <p className="text-gray-500">Define typical roles to calculate productivity gains</p>
      </div>
      <div className="card mb-6">
        <h2 className="font-semibold mb-4">Add Role</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          <input placeholder="Role title" value={newRole.role_title} onChange={e => setNewRole({...newRole, role_title: e.target.value})} className="input-field" />
          <input placeholder="Annual salary" value={newRole.annual_salary} onChange={e => setNewRole({...newRole, annual_salary: e.target.value})} className="input-field" />
          <input placeholder="Retention %" value={newRole.baseline_retention_percent} onChange={e => setNewRole({...newRole, baseline_retention_percent: e.target.value})} className="input-field" />
        </div>
        <button className="btn-primary">Add Role</button>
      </div>
      <div className="card">
        <h2 className="font-semibold mb-4">Your Roles ({roles.length})</h2>
        {roles.length === 0 ? <p className="text-gray-500">No roles added yet.</p> : (
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left py-2 text-sm text-gray-500">Role</th><th className="text-left py-2 text-sm text-gray-500">Salary</th><th className="text-left py-2 text-sm text-gray-500">Retention</th></tr></thead>
            <tbody>{roles.map(r => <tr key={r.id} className="border-b border-gray-100"><td className="py-3">{r.role_title}</td><td className="py-3">£{r.annual_salary?.toLocaleString()}</td><td className="py-3">{r.baseline_retention_percent}%</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
