'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Candidate } from '@/types/database';

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ first_name: '', last_name: '', email: '', country_of_origin: '', primary_programme: 'employment' as const });

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('candidates').select('*').order('last_name');
        if (data) setCandidates(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleAdd = async () => {
    if (!newCandidate.first_name || !newCandidate.last_name) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.from('candidates').insert({ ...newCandidate, email: newCandidate.email || null, country_of_origin: newCandidate.country_of_origin || null }).select().single();
      if (error) throw error;
      setCandidates([...candidates, data]);
      setShowForm(false);
      setNewCandidate({ first_name: '', last_name: '', email: '', country_of_origin: '', primary_programme: 'employment' });
    } catch (err) {
      console.error(err);
      alert('Failed to add candidate');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-ach-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-500">{candidates.length} total</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">+ Add Candidate</button>
      </div>

      {showForm && (
        <div className="card mb-6">
          <h2 className="font-semibold mb-4">Add New Candidate</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input placeholder="First name *" value={newCandidate.first_name} onChange={(e) => setNewCandidate({ ...newCandidate, first_name: e.target.value })} className="input-field" />
            <input placeholder="Last name *" value={newCandidate.last_name} onChange={(e) => setNewCandidate({ ...newCandidate, last_name: e.target.value })} className="input-field" />
            <input placeholder="Email" value={newCandidate.email} onChange={(e) => setNewCandidate({ ...newCandidate, email: e.target.value })} className="input-field" />
            <input placeholder="Country of origin" value={newCandidate.country_of_origin} onChange={(e) => setNewCandidate({ ...newCandidate, country_of_origin: e.target.value })} className="input-field" />
            <select value={newCandidate.primary_programme} onChange={(e) => setNewCandidate({ ...newCandidate, primary_programme: e.target.value as any })} className="input-field">
              <option value="employment">Employment</option>
              <option value="housing">Housing</option>
              <option value="esol">ESOL</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} disabled={saving} className="btn-primary">{saving ? 'Adding...' : 'Add'}</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        {candidates.length === 0 ? (
          <p className="text-gray-500">No candidates yet.</p>
        ) : (
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left py-2 text-sm text-gray-500">Name</th><th className="text-left py-2 text-sm text-gray-500">Programme</th><th className="text-left py-2 text-sm text-gray-500">Country</th></tr></thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id} className="border-b border-gray-100">
                  <td className="py-3 font-medium">{c.first_name} {c.last_name}</td>
                  <td className="py-3 capitalize">{c.primary_programme || '-'}</td>
                  <td className="py-3">{c.country_of_origin || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
