'use client';
import React, { useState } from 'react';
import { EMICalculatorData } from '../types';

export default function EMICalculator({ title, subtitle, defaultAmount, defaultTenure, defaultRate, bankPartners, advisoryNote }: EMICalculatorData) {
  const [principal, setPrincipal] = useState(defaultAmount);
  const [tenure, setTenure] = useState(defaultTenure);
  const [rate, setRate] = useState(defaultRate);

  const calculateEMI = () => {
    const p = principal;
    const r = rate / 12 / 100;
    const n = tenure * 12;
    if (r === 0) return p / n;
    return (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const emi = calculateEMI();
  const totalAmount = emi * tenure * 12;
  const totalInterest = totalAmount - principal;

  const principalPercent = (principal / totalAmount) * 100;

  return (
    <section id="emi-calculator" className="py-24 bg-gray-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl text-[#0F172A] mb-6" style={{ fontFamily: 'var(--font-libre)' }}>{title}</h2>
          <p className="text-[#64748B] text-lg" style={{ fontFamily: 'var(--font-outfit)' }}>{subtitle}</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] p-10 lg:p-16 border-r border-gray-100">
            <div className="space-y-12" style={{ fontFamily: 'var(--font-outfit)' }}>
              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-[#64748B] font-medium">Loan Amount</label>
                  <span className="text-xl text-[#0F172A] font-semibold">₹ {principal.toLocaleString('en-IN')}</span>
                </div>
                <input type="range" min="2000000" max="30000000" step="100000" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]" />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-[#64748B] font-medium">Tenure (Years)</label>
                  <span className="text-xl text-[#0F172A] font-semibold">{tenure} Years</span>
                </div>
                <input type="range" min="5" max="30" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]" />
              </div>

              <div>
                <div className="flex justify-between mb-4">
                  <label className="text-[#64748B] font-medium">Interest Rate (% p.a.)</label>
                  <span className="text-xl text-[#0F172A] font-semibold">{rate}%</span>
                </div>
                <input type="range" min="8" max="12" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]" />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[40%] bg-[#0F172A] text-white p-10 lg:p-16 flex flex-col justify-center">
            <div className="mb-4 text-white/70" style={{ fontFamily: 'var(--font-outfit)' }}>Monthly EMI</div>
            <div className="text-5xl md:text-6xl text-[#C9A84C] mb-10" style={{ fontFamily: 'var(--font-libre)' }}>
              ₹ {Math.round(emi).toLocaleString('en-IN')}
            </div>

            <div className="space-y-6 mb-10" style={{ fontFamily: 'var(--font-outfit)' }}>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Principal Amount</span>
                <span className="font-semibold">₹ {Math.round(principal).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Total Interest</span>
                <span className="font-semibold">₹ {Math.round(totalInterest).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-white/70">Total Amount Payable</span>
                <span className="font-semibold text-lg">₹ {Math.round(totalAmount).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="w-full h-3 flex rounded-full overflow-hidden bg-white/20">
              <div style={{ width: `${principalPercent}%` }} className="h-full bg-[#C9A84C]"></div>
            </div>
            <div className="flex justify-between text-xs mt-3 text-white/50 uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit)' }}>
              <span>Principal</span>
              <span>Interest</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-[#64748B] max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-outfit)' }}>
          {advisoryNote}
        </div>
      </div>
    </section>
  );
}
