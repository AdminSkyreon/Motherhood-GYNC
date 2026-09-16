import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import Header from '@/components/Header';
import LandingHeroSection from '@/components/LandingHeroSection';
import LandingFeaturesBar from '@/components/LandingFeaturesBar';
import LandingSymptoms from '@/components/LandingSymptoms';
import LandingGynaecologyServices from '@/components/LandingGynaecologyServices';
import LandingGynaecologists from '@/components/LandingGynaecologists';
import LandingWhyChooseUs from '@/components/LandingWhyChooseUs';
import LandingWomanhoodLifecycle from '@/components/LandingWomanhoodLifecycle';
import LandingFaq from '@/components/LandingFaq'; // FAQ component import
import LandingReview from '@/components/LandingReview'; // LandingReview component import
import LandingLocation from '@/components/LandingLocation'; // LandingLocation component import
import LandingFooter from '@/components/LandingFooter'; // LandingFooter component import

function getHospitalBySlug(slug) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'hospitals', `${slug}.json`);
    const fileData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileData);
  } catch (error) {
    return null;
  }
}

export default async function HospitalLocationPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const hospital = getHospitalBySlug(slug);
  if (!hospital) notFound();

  const { 
    site, 
    banner, 
    booking, 
    reviews, 
    featuresBar, 
    symptoms, 
    gynaecologyServices, 
    gynaecologists, 
    whyChooseUs, 
    womanhoodLifecycle, 
    faqs,
    location, // Added location data extraction
    footer // Added footer data extraction
  } = hospital.sections;

  return (
    <main className="min-h-screen bg-pink-50/30 text-gray-800">
      <Header site={site} />
      <LandingHeroSection 
        banner={banner} 
        site={site} 
        booking={booking} 
        reviews={reviews} 
      />
      
      {/* Features Bar */}
      <LandingFeaturesBar features={featuresBar} />
      
      {/* What are you experiencing? Section */}
      <LandingSymptoms data={symptoms} />

      {/* Our Gynaecology Services Section */}
      {gynaecologyServices?.enabled && (
        <LandingGynaecologyServices data={gynaecologyServices} />
      )}

      {/* Meet Our Gynaecologists Section */}
      {gynaecologists?.enabled && (
        <LandingGynaecologists data={gynaecologists} />
      )}

      {/* Why Women Choose Us Section */}
      {whyChooseUs?.enabled && (
        <LandingWhyChooseUs data={whyChooseUs} />
      )}

      {/* Gynaecology Care Across Every Stage of Womanhood Section */}
      {womanhoodLifecycle?.enabled && (
        <LandingWomanhoodLifecycle data={womanhoodLifecycle} />
      )}

      {/* Frequently Asked Questions Section */}
      {faqs?.enabled && (
        <LandingFaq data={faqs} />
      )}

      {/* What mothers say about Motherhood (Reviews Section) */}
      {reviews?.enabled && (
        <LandingReview reviews={reviews} />
      )}

      {/* Hospital Location & Directions Section */}
      {location?.enabled && (
        <LandingLocation 
          locationData={location} 
          hospitalName={site?.hospitalName} 
          phone={site?.phone} 
        />
      )}

      {/* Footer Section */}
      <LandingFooter data={hospital} />
    </main>
  );
}