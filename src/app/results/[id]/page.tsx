import { elections } from "@/lib/dummy-data";
import { ResultsPage } from "@/components/results/ResultsPage";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ElectionResultsPage({ params }: PageProps) {
  const { id } = await params;
  const election = elections.find((e) => e.id === id) ?? elections[0];

  if (!election) notFound();

  return <ResultsPage election={election} />;
}

export function generateStaticParams() {
  return elections.map((e) => ({ id: e.id }));
}
