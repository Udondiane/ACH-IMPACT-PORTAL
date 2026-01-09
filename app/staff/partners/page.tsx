'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function PartnersPage() {
  const [loading, setLoading] = useState(true);
  const [partners, setPartners] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newPartner, setNewPartner] = useState({ name: '', sector: '', contact_email: '' });

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('partners').select('*').order('name');
        if (data) setPartners(data);
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
          <h1 className="text-2xl font-bold text-gray-900">Partners</h1>
          <p className="text-gray-500">{partners.length} organisations</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">+ Add Partner</button>
      </div>
      {showForm && (
        <div className="card mb-6">
          <h2 className="font-semibold mb-4">Add Partner</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <input placeholder="Organisation name" value={newPartner.name} onChange={e => setNewPartner({...newPartner, name: e.target.value})} className="input-field" />
            <input placeholder="Sector" value={newPartner.sector} onChange={e => setNewPartner({...newPartner, sector: e.target.value})} className="input-field" />
            <input placeholder="Contact email" value={newPartner.contact_email} onChange={e => setNewPartner({...newPartner, contact_email: e.target.value})} className="input-field" />
          </div>
          <div className="flex gap-2">
            <button className="btn-primary">Add</button>
            <button onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
          </div>
        </div>
      )}
      <div className="card">
        {partners.length === 0 ? <p className="text-gray-500">No partners.</p> : (
          <table className="w-full">
            <thead><tr className="border-b"><th className="text-left py-2 text-sm text-gray-500">Name</th><th className="text-left py-2 text-sm text-gray-500">Sector</th><th className="text-left py-2 text-sm text-gray-500">Type</th></tr></thead>
            <tbody>{partners.map(p => <tr key={p.id} className="border-b border-gray-100"><td className="py-3 font-medium">{p.name}</td><td className="py-3 text-gray-600">{p.sector || '-'}</td><td className="py-3"><span className={`text-xs px-2 py-1 rounded ${p.is_employment_partner ? 'bg-teal-100 text-teal-700' : 'bg-amber-100 text-amber-700'}`}>{p.is_employment_partner ? 'Employment' : 'Training'}</span></td></tr>)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
