import { notFound } from "next/navigation";
import { getHospitalBySlug } from "@/lib/hospitals";
import HospitalLanding from "@/components/HospitalLanding";

export default function HomePage() {
  const hospital = getHospitalBySlug("banashankari");
  if (!hospital) notFound();

  return <HospitalLanding hospital={hospital} />;
}
