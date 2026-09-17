import { notFound } from "next/navigation";
import { getHospitalBySlug, getHospitalSlugs } from "@/lib/hospitals";
import HospitalLanding from "@/components/HospitalLanding";

export const dynamicParams = false;

export function generateStaticParams() {
  return getHospitalSlugs().map((slug) => ({ slug }));
}

export default async function HospitalLocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hospital = getHospitalBySlug(slug);
  if (!hospital) notFound();

  return <HospitalLanding hospital={hospital} />;
}
