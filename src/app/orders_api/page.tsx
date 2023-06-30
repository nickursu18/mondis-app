"use client"
import Image from 'next/image'
import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
export default async function Home() {
    const supabaseUrl: any = 'https://pkrvehrepdgvyksotuyg.supabase.co'
    const supabaseKey: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrcnZlaHJlcGRndnlrc290dXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NTQ4NTcsImV4cCI6MjAwMzUzMDg1N30.ZLsSjv5GYf82e2pLwOWrcbSH89jwuLedNdTEeqdQsKE"
    const supabase = createClient(supabaseUrl, supabaseKey);
    const router = useRouter();
    const { data: orders } = await supabase
      .from('orders')
      .select();
    return JSON.stringify(orders);
}