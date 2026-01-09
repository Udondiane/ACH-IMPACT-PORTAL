'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function CandidatesPage() {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({ first_name: '', last_name: '', email: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('candidates').select('*').order('last_name');
        if (data) setCandidates(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadData();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[400px]"><div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div></div>;

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
          <h2 className="font-semibold mb-4">Add Candidate</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <input placeholder="First name" value={newCandidate.first_name} onChange={e => setNewCandidate({...newCandidate, first_name: e.target.value})} className="input-field" />
            <input placeholder="Last name" value={newCandidate.last_name} onChange={e => setNewCandidate({...newCandidate, last_name: e.target.value})} className="input-field" />
            <input placeholder="Email" value={newCandidate.email} onChange={e => setNewCandidate({...newCandidate, email: e.target.value})} className="input-field" />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Add</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}
      <div className="card">
        {candidates.length === 0 ? <p className="text-gray-500">No candidates.</p> : (
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left py-2 text-sm text-gray-500">Name</th><th className="text-left py-2 text-sm text-gray-500">Email</th><th className="text-left py-2 text-sm text-gray-500">Programme</th></tr></thead>
            <tbody>{candidates.map(c => <tr key={c.id} className="border-b border-gray-100"><td className="py-3 font-medium">{c.first_name} {c.last_name}</td><td className="py-3 text-gray-600">{c.email || '-'}</td><td className="py-3 capitalize">{c.primary_programme || '-'}</td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
