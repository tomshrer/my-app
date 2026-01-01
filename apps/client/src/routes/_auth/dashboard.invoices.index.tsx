import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/invoices/')({
  component: InvoicesIndex,
})

function InvoicesIndex() {
  return (
    <div className="flex h-full items-center justify-center text-gray-500">
      Select an invoice
    </div>
  )
}
