import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type MenuItem = {
    id: number;
    parent_id: number | null;
    label: string;
    href: string;
    visible: boolean;
    ord: number;
};

export default function Debug() {
    const [data, setData] = useState<MenuItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('menu_items')
                .select('*')
                .order('ord', { ascending: true })            // ✅ usa "ord", non "ordine"

            if (error) {
                console.error('❌ Errore Supabase:', error.message);
                setError(error.message);
                return;
            }

            if (data && data.length > 0) {
                console.log('✅ Dati Supabase:', data);
                setData(data);
            } else {
                console.warn('⚠️ Nessun dato trovato nella tabella menu_items');
                setError('Nessun dato trovato (tabella vuota o RLS attivo)');
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🔍 Debug Menu Items</h1>
            {error ? (
                <p style={{ color: 'red' }}>Errore: {error}</p>
            ) : (
                <pre
                    style={{
                        background: '#f4f4f4',
                        padding: '1rem',
                        borderRadius: '8px',
                        overflowX: 'auto',
                    }}
                >
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}
