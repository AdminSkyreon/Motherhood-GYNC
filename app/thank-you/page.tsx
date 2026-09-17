import { notFound } from "next/navigation";
import { getHospitalBySlug } from "@/lib/hospitals";
import HospitalLanding from "@/components/HospitalLanding";

export default function ThankYouPage() {
  const hospital = getHospitalBySlug("banashankari");
  if (!hospital) notFound();

  return <HospitalLanding hospital={hospital} thankYouMode />;
}
