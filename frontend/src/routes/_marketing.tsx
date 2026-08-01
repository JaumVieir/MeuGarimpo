import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/features/marketing/components/PageShell";

export const Route = createFileRoute("/_marketing")({
  component: () => (
    <PageShell>
      <Outlet />
    </PageShell>
  ),
});
