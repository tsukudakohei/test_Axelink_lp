
import Hero from '@/components/Hero';
import ProblemSection from '@/components/ProblemSection';
import Strengths from '@/components/Strengths';
import ValueProposition from '@/components/ValueProposition';
import ServicesOverview from '@/components/ServicesOverview';
import ProcessFlow from '@/components/ProcessFlow';
import CaseStudies from '@/components/CaseStudies';
import FAQ from '@/components/FAQ';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemSection />
      <Strengths />
      <ValueProposition />
      <ServicesOverview />
      <ProcessFlow />
      <CaseStudies />
      <FAQ />
      <CTASection />
    </main>
  );
}
