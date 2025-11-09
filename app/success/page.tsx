'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold text-slate-900">
            Pagamento Realizado!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-slate-600">
            Seu pedido foi confirmado com sucesso. Em breve você receberá uma confirmação por email.
          </p>
          {sessionId && (
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-xs text-slate-500 mb-1">ID da Sessão</p>
              <p className="text-sm font-mono text-slate-700 break-all">{sessionId}</p>
            </div>
          )}
          <Link href="/">
            <Button className="w-full bg-[#1f3048] hover:bg-[#18b4dd]">
              Voltar para a Loja
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
