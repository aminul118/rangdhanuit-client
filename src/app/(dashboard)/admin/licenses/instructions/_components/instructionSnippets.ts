import {
  Terminal,
  FileCode,
  Layers,
  Layout,
  CreditCard,
  CheckCircle2,
} from "lucide-react";

export const envCode = `# 1. Mandatory API License Key (.env / .env.local)
# SECURITY NOTICE: Do NOT prefix with NEXT_PUBLIC_! Keep server-side only.
RANGDHANU_LICENSE_API_KEY="rdit_paste_client_api_key_here"
RANGDHANU_CENTRAL_URL="https://server.rangdhanuit.com/api/v1"`;

export const checkerCode = `// utils/checkLicense.ts (Next.js Server-Side Verification)
export interface ILicenseStatus {
  isValid: boolean;
  status: 'ACTIVE' | 'DUE' | 'SUSPENDED';
  clientName?: string;
  clientDomain?: string;
  dueDate: string;
  monthlyFee: number;
  billingCycle: 'MONTHLY' | 'ANNUAL' | 'BIANNUAL' | 'CUSTOM';
  billingMonths: number;
  totalPayableFee: number;
  lastPaymentTrxId?: string;
}

export async function checkLicenseStatus(domain: string): Promise<ILicenseStatus> {
  const centralUrl = process.env.RANGDHANU_CENTRAL_URL || 'https://server.rangdhanuit.com/api/v1';
  const apiKey = process.env.RANGDHANU_LICENSE_API_KEY;

  if (!apiKey || !apiKey.trim()) {
    return {
      isValid: false,
      status: 'SUSPENDED',
      dueDate: new Date().toISOString(),
      monthlyFee: 0,
      billingCycle: 'MONTHLY',
      billingMonths: 1,
      totalPayableFee: 0,
    };
  }

  try {
    const res = await fetch(\`\${centralUrl}/licenses/verify\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, domain }),
      cache: 'no-store',
    });

    if (!res.ok) throw new Error('Verification failed');
    const data = await res.json();

    // Dev mode connection success log
    if (process.env.NODE_ENV !== 'production' && data?.data?.isValid) {
      console.log(\`[DEV MODE] ✅ Rangdhanu IT License API Connected Successfully! (Status: \${data.data.status})\`);
    }

    return data.data;
  } catch (error) {
    return {
      isValid: false,
      status: 'SUSPENDED',
      dueDate: new Date().toISOString(),
      monthlyFee: 0,
      billingCycle: 'MONTHLY',
      billingMonths: 1,
      totalPayableFee: 0,
    };
  }
}`;

export const modalCode = `// components/SubscriptionModal.tsx (shadcn/ui Client Component)
"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface SubscriptionModalProps {
  status: 'ACTIVE' | 'DUE' | 'SUSPENDED';
  monthlyFee: number;
  totalPayableFee?: number;
  billingCycle?: 'MONTHLY' | 'ANNUAL' | 'BIANNUAL' | 'CUSTOM';
  billingMonths?: number;
  apiKey: string;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  status,
  monthlyFee,
  totalPayableFee,
  billingCycle = 'MONTHLY',
  billingMonths = 1,
  apiKey,
}) => {
  const [trxId, setTrxId] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (status === 'ACTIVE') return null;

  const payable = totalPayableFee || monthlyFee * (billingMonths || 1);
  const planLabel =
    billingCycle === 'ANNUAL' ? '1 Year (12 Months)' :
    billingCycle === 'BIANNUAL' ? '2 Years (24 Months)' :
    \`Monthly (\${billingMonths} Mo)\`;

  const handleSubmitTrx = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId.trim()) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('https://server.rangdhanuit.com/api/v1/licenses/submit-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, trxId: trxId.trim() }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.message || 'Failed to submit TrxID');
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error submitting Transaction ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={status !== 'ACTIVE'}>
      <DialogContent showCloseButton={false} className="max-w-md p-6 rounded-3xl border border-border shadow-2xl">
        <DialogHeader className="text-center space-y-2">
          <div className="mx-auto w-14 h-14 rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-600">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <DialogTitle className="text-xl font-bold text-rose-600">
            {status === 'SUSPENDED' ? 'Admin Access Suspended' : 'Website Subscription Payment Due'}
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Plan: <Badge variant="secondary" className="font-semibold">{planLabel}</Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 rounded-2xl bg-muted/40 border border-border/60 text-center space-y-1 my-2">
          <span className="text-xs text-muted-foreground font-medium">Total Amount Due</span>
          <div className="text-3xl font-extrabold text-rose-600">{payable} BDT</div>
          <span className="text-[11px] text-muted-foreground">
            ({monthlyFee} BDT / mo × {billingMonths} months)
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-800 space-y-1">
          <span className="text-xs font-semibold text-pink-700 dark:text-pink-300">
            bKash Personal / Merchant Number:
          </span>
          <div className="text-xl font-bold text-pink-600 dark:text-pink-400 font-mono">
            017XXXXXXXX
          </div>
        </div>

        {submitted ? (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 space-y-1 text-center">
            <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500" />
            <p className="font-semibold">Transaction ID Submitted!</p>
            <p className="text-[11px] opacity-80">
              Rangdhanu IT will verify your bKash payment and unlock your admin access.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitTrx} className="space-y-3">
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 text-xs rounded-xl bg-red-50 text-red-600 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Input
              type="text"
              required
              placeholder="Enter bKash TrxID (e.g. 9B7X2K...)"
              value={trxId}
              onChange={(e) => setTrxId(e.target.value)}
              className="h-11 rounded-xl text-sm font-mono"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl"
            >
              {loading ? 'Submitting Payment...' : 'Submit bKash TrxID'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};`;

export const layoutCode = `// app/admin/layout.tsx (Next.js Server Component)
import { checkLicenseStatus } from '@/utils/checkLicense';
import { SubscriptionModal } from '@/components/SubscriptionModal';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const license = await checkLicenseStatus('clientwebsite.com');

  return (
    <div>
      <SubscriptionModal
        status={license.status}
        monthlyFee={license.monthlyFee}
        totalPayableFee={license.totalPayableFee}
        billingCycle={license.billingCycle}
        billingMonths={license.billingMonths}
        apiKey={process.env.RANGDHANU_LICENSE_API_KEY!}
      />

      {children}
    </div>
  );
}`;

export const subscriptionPageCode = `// app/admin/subscription/page.tsx (Complete Copy-Paste Client Subscription & Billing Page)
import React from 'react';
import { checkLicenseStatus } from '@/utils/checkLicense';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import {
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Globe,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { ClientPaymentForm } from './_components/ClientPaymentForm';

export const dynamic = 'force-dynamic';

export default async function SubscriptionPage() {
  const license = await checkLicenseStatus('clientwebsite.com');

  const formattedDueDate = license?.dueDate
    ? format(parseISO(license.dueDate), 'MMM dd, yyyy')
    : 'N/A';

  const planLabel =
    license.billingCycle === 'ANNUAL'
      ? '1 Year (12 Months)'
      : license.billingCycle === 'BIANNUAL'
      ? '2 Years (24 Months)'
      : \`Monthly (\${license.billingMonths || 1} Mo)\`;

  const payableFee =
    license.totalPayableFee || (license.monthlyFee || 0) * (license.billingMonths || 1);

  return (
    <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner Package Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-background p-8 border border-purple-800/40 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">CURRENT PACKAGE</span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center px-5 py-2 rounded-full bg-purple-600/90 text-white font-extrabold text-lg shadow-md shadow-purple-900/50">
                {planLabel} - {license.monthlyFee || 0} BDT/mo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-700/50 text-purple-300">
              <Globe className="w-5 h-5" />
            </div>
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-700/50 text-purple-300">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Account Status Card */}
        <Card className="rounded-2xl border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div
              className={\`w-12 h-12 rounded-2xl flex items-center justify-center \${
                license.status === 'ACTIVE'
                  ? 'bg-emerald-500/10 text-emerald-500'
                  : license.status === 'DUE'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-rose-500/10 text-rose-500'
              }\`}
            >
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Account Status</span>
              <span
                className={\`text-base font-bold capitalize \${
                  license.status === 'ACTIVE'
                    ? 'text-emerald-500'
                    : license.status === 'DUE'
                    ? 'text-amber-500'
                    : 'text-rose-500'
                }\`}
              >
                {license.status.toLowerCase()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Connection Status Card */}
        <Card className="rounded-2xl border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Connection Status</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-base font-bold text-foreground">ONLINE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expiry Date Card */}
        <Card className="rounded-2xl border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Expiry Date</span>
              <span className="text-base font-bold text-foreground">{formattedDueDate}</span>
            </div>
          </CardContent>
        </Card>

        {/* Plan Rate Card */}
        <Card className="rounded-2xl border-border/80 bg-card/60 shadow-xs">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-muted-foreground font-medium block">Plan Rate</span>
              <span className="text-base font-bold text-foreground">৳ {license.monthlyFee || 0}.0</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pay Bill Component */}
      <ClientPaymentForm
        monthlyFee={license.monthlyFee || 0}
        payableFee={payableFee}
        billingMonths={license.billingMonths || 1}
        lastPaymentTrxId={license.lastPaymentTrxId}
      />

      {/* Payment History Table */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-foreground tracking-tight">Payment History</h3>
        <div className="rounded-2xl border border-border/80 overflow-hidden bg-card/40 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 border-b border-border/60 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <tr>
                  <th className="p-4">Pay Date</th>
                  <th className="p-4">Bill Amount</th>
                  <th className="p-4">Receive Amount</th>
                  <th className="p-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs font-mono">
                {license.lastPaymentTrxId ? (
                  <tr className="hover:bg-muted/30 transition">
                    <td className="p-4 text-muted-foreground">{format(new Date(), 'yyyy-MM-dd HH:mm:ss')}</td>
                    <td className="p-4 text-rose-500 font-bold">-{payableFee} BDT</td>
                    <td className="p-4 text-emerald-500 font-bold">{payableFee} BDT</td>
                    <td className="p-4 text-muted-foreground">
                      Recharge: {license.clientDomain} / {planLabel} / BKASH payment TrxID {license.lastPaymentTrxId} (Submitted)
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground font-sans">
                      No payment history available yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}`;

export const testingCode = `// STEP-BY-STEP TESTING & VERIFICATION GUIDE FOR DEVELOPERS

/* 
================================================================================
1. VERIFY DEVELOPER DEV MODE CONNECTION
================================================================================
When running the client website in dev mode (npm run dev), check the server terminal console.
If RANGDHANU_LICENSE_API_KEY is correctly set in .env, you will see:
  [DEV MODE] ✅ Rangdhanu IT License API Connected Successfully! (Status: ACTIVE)

================================================================================
2. HOW TO TEST ACTIVE STATE (NORMAL ACCESS)
================================================================================
- Set Status = "ACTIVE" in Rangdhanu IT Admin Panel (/admin/licenses).
- Access http://clientwebsite.com/admin.
- Access is granted normally and no subscription modal appears.

================================================================================
3. HOW TO TEST DUE / SUSPENDED STATE (ACCESS LOCK)
================================================================================
- Go to Rangdhanu IT Admin Panel (/admin/licenses).
- Edit client license and change Status to "DUE" or "SUSPENDED" (or set Due Date in past).
- Refresh http://clientwebsite.com/admin.
- The SubscriptionModal will trigger automatically, blocking admin pages, showing the fee & bKash TrxID input box.

================================================================================
4. HOW TO TEST BKASH PAYMENT SUBMISSION & AUTOMATIC UNLOCK
================================================================================
- In the SubscriptionModal popup, enter a test bKash TrxID (e.g. TRX9B7X2K89) and click Submit.
- Open Rangdhanu IT Admin Panel (/admin/licenses) — you will see the client's submitted TrxID.
- Click "Approve" in Rangdhanu IT.
- Refresh the client website admin page — status changes back to "ACTIVE" and features unlock instantly!
*/`;

export const instructionTabs = [
  {
    id: "env",
    label: "1. Env Setup",
    icon: Terminal,
    code: envCode,
    filename: ".env",
  },
  {
    id: "checker",
    label: "2. checkLicense.ts",
    icon: FileCode,
    code: checkerCode,
    filename: "utils/checkLicense.ts",
  },
  {
    id: "modal",
    label: "3. Payment Modal",
    icon: Layers,
    code: modalCode,
    filename: "components/SubscriptionModal.tsx",
  },
  {
    id: "layout",
    label: "4. Admin Layout",
    icon: Layout,
    code: layoutCode,
    filename: "app/admin/layout.tsx",
  },
  {
    id: "subscription",
    label: "5. Subscription Page",
    icon: CreditCard,
    code: subscriptionPageCode,
    filename: "app/admin/subscription/page.tsx",
  },
  {
    id: "testing",
    label: "6. Testing Guide",
    icon: CheckCircle2,
    code: testingCode,
    filename: "TESTING_GUIDE.md",
  },
];
