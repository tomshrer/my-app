import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/invoices')({
  component: InvoicesLayout,
})

const invoices = [
  { id: 'inv-001', title: 'Website Design' },
  { id: 'inv-002', title: 'Mobile App' },
  { id: 'inv-003', title: 'SEO campaign' },
]

export function InvoicesLayout() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="flex w-48 flex-col divide-y border-r bg-white">
        {invoices.map((invoice) => (
          <Link
            key={invoice.id}
            to="/dashboard/invoices/$invoiceId"
            params={{ invoiceId: invoice.id }}
            className="px-3 py-2 text-blue-600 transition hover:bg-blue-50"
            activeProps={{ className: 'font-bold bg-blue-100' }}
          >
            #{invoice.id} – {invoice.title}
          </Link>
        ))}
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
