import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Transaction {
    amount: number;
    category: string;
    type: string;
    date: string;
    balance: number;
}

interface MonthlyData {
    name: string;
    income: number;
    expense: number;
}

const Reports: React.FC = () => {
    const [data, setData] = useState<MonthlyData[]>([]);

    useEffect(() => {
        const storedTransactions: Transaction[] = JSON.parse(localStorage.getItem('transactions') || '[]');
    
        // Filter transactions based on the current year
        const currentYear = new Date().getFullYear();
        const transactionsThisYear = storedTransactions.filter(transaction => {
            return new Date(transaction.date).getFullYear() === currentYear;
        });
    
        const monthlyData: MonthlyData[] = [];
    
        transactionsThisYear.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
            const existingMonth = monthlyData.find(monthData => monthData.name === monthYear);
            if (existingMonth) {
                if (transaction.type === 'income') {
                    existingMonth.income += transaction.amount;
                } else if (transaction.type === 'expenses') {
                    existingMonth.expense += transaction.amount;
                }
            } else {
                const newMonthData: MonthlyData = { name: monthYear, income: 0, expense: 0 };
                if (transaction.type === 'income') {
                    newMonthData.income = transaction.amount;
                } else if (transaction.type === 'expenses') {
                    newMonthData.expense = transaction.amount;
                }
                monthlyData.push(newMonthData);
            }
        });
    
        // Sort monthlyData by month
        monthlyData.sort((a, b) => {
            const monthA = new Date(a.name).getMonth();
            const monthB = new Date(b.name).getMonth();
            return monthA - monthB;
        });
    
        setData(monthlyData);
    }, []);
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="secondary">
                    <IonTitle color="primary">Reports</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ResponsiveContainer width="100%" height={400} style={{ paddingTop: '25px' }}>
                    <BarChart
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="income" fill="var(--ion-color-success)" />
                        <Bar dataKey="expense" fill="var(--ion-color-danger)" />
                    </BarChart>
                </ResponsiveContainer>
            </IonContent>
        </IonPage>
    );
};

export default Reports;
