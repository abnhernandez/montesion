import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'



interface Payment {
    id: number
    amount: number
    payment_date: string
    status: string
    description: string
}

export default function Pagos() {
    const [payments, setPayments] = useState<Payment[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClientComponentClient<Database>()

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { data, error } = await supabase
                    .from('payments')
                    .select('*')
                    .order('payment_date', { ascending: false })

                if (error) {
                    throw error
                }

                if (data) {
                    setPayments(data)
                }
            } catch (error) {
                console.error('Error fetching payments:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchPayments()
    }, [supabase])

    if (loading) {
        return <div>Cargando pagos...</div>
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Historial de Pagos</h2>
            {payments.length === 0 ? (
                <p>No hay pagos registrados.</p>
            ) : (
                <div className="grid gap-4">
                    {payments.map((payment) => (
                        <div
                            key={payment.id}
                            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{payment.description}</p>
                                    <p className="text-gray-600">
                                        Fecha: {new Date(payment.payment_date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-lg font-bold">
                                        ${payment.amount.toFixed(2)}
                                    </span>
                                    <span
                                        className={`ml-2 px-2 py-1 rounded-full text-sm ${
                                            payment.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                    >
                                        {payment.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}