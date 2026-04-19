import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturePitch from "@/components/sections/FeaturePitch";
import FeatureMatch from "@/components/sections/FeatureMatch";
import FeatureProof from "@/components/sections/FeatureProof";
import LongScroll from "@/components/sections/LongScroll";
import CtaStrip from "@/components/sections/CtaStrip";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FeaturePitch />
        <FeatureMatch />
        <FeatureProof />
        <LongScroll />
        <CtaStrip />
      </main>
      <Footer />
    </>
  );
}
