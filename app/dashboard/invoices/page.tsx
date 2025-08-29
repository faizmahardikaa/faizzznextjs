import Link from "next/link";
import Search from "@/app/ui/search";
import Table from "@/app/ui/invoices/table";
import Pagination from "@/app/ui/invoices/pagination";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchInvoicesPages } from "@/app/lib/data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoices | Acme Dashboard",
};
// Halaman daftar invoices
export default async function Page(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  // Await searchParams sesuai App Router terbaru
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        {/* Tombol create invoice */}
        <Link
          href="/dashboard/invoices/create"
          className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-500"
        >
          <span className="hidden md:block">Create Invoice</span>
        </Link>
      </div>

      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
