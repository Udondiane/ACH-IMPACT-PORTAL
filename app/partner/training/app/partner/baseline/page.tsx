'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PartnerBaseline, Partner } from '@/types/database';

export default function BaselinePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [roles, setRoles] = useState<PartnerBaseline[]>([]);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [newRole, setNewRole] = useState({
    role_title: '',
    annual_salary: '',
    baseline_retention_percent: '52',
    difficulty: 'moderate' as const,
    weeks_to_fill: '6',
  });

  useEffect(() => {
    async function loadData() {
      try {
        const { data: partnerData } = await supabase
          .from('partners')
          .select('*')
          .eq('is_employment_partner', true)
          .limit(1)
          .single();

        if (partnerData) {
          setPartner(partnerData);
          const { data: baselines } = await supabase
            .from('partner_baselines')
            .select('*')
            .eq('partner_id', partnerData.id)
            .order('role_title');
          if (baselines) setRoles(baselines);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAdd = async () => {
    if (!newRole.role_title || !newRole.annual_salary || !partner) return;
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('partner_baselines')
        .insert({
          partner_id: partner.id,
          role_title: newRole.role_title,
          annual_salary: parseInt(newRole.annual_salary),
          baseline_retention_percent: parseInt(newRole.baseline_retention_percent),
          difficulty: newRole.difficulty,
          weeks_to_fill: parseInt(newRole.weeks_to_fill),
        })
        .select()
        .single();
      if (error) throw error;
      setRoles([...roles, data]);
      setNewRole({ role_title: '', annual_salary: '', baseline_retention_percent: '52', difficulty: 'moderate', weeks_to_fill: '6' });
    } catch (err) {
      console.error(err);
      alert('Failed to add role');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this role?')) return;
    try {
      await supabase.from('partner_baselines').delete().eq('id', id);
      setRoles(roles.filter(r => r.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Baseline Role Data</h1>
        <p className="text-gray-500">Define your typical roles to calculate productivity gains</p>
      </div>

      <div className="card mb-6">
        <h2 className="font-semibold text-gray-900 mb-4">Add New Role</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input type="text" placeholder="Role title" value={newRole.role_title} onChange={(e) => setNewRole({ ...newRole, role_title: e.target.value })} className="input-field" />
          <input type="number" placeholder="Annual salary (£)" value={newRole.annual_salary} onChange={(e) => setNewRole({ ...newRole, annual_salary: e.target.value })} className="input-field" />
          <input type="number" placeholder="Retention %" value={newRole.baseline_retention_percent} onChange={(e) => setNewRole({ ...newRole, baseline_retention_percent: e.target.value })} className="input-field" />
          <select value={newRole.difficulty} onChange={(e) => setNewRole({ ...newRole, difficulty: e.target.value as any })} className="input-field">
            <option value="easy">Easy to fill</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard to fill</option>
            <option value="very_hard">Very hard</option>
          </select>
          <input type="number" placeholder="Weeks to fill" value={newRole.weeks_to_fill} onChange={(e) => setNewRole({ ...newRole, weeks_to_fill: e.target.value })} className="input-field" />
          <button onClick={handleAdd} disabled={saving} className="btn-primary">{saving ? 'Adding...' : 'Add Role'}</button>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Your Roles ({roles.length})</h2>
        {roles.length === 0 ? (
          <p className="text-gray-500">No roles added yet.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b"><th className="text-left py-2 text-sm text-gray-500">Role</th><th className="text-left py-2 text-sm text-gray-500">Salary</th><th className="text-left py-2 text-sm text-gray-500">Retention</th><th></th></tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{r.role_title}</td>
                  <td className="py-3">£{(r.annual_salary || 0).toLocaleString()}</td>
                  <td className="py-3">{r.baseline_retention_percent}%</td>
                  <td className="py-3"><button onClick={() => handleDelete(r.id)} className="text-red-600 text-sm">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
