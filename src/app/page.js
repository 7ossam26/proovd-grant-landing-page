import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import FeaturePitch from "@/components/sections/FeaturePitch";
import FeatureMatch from "@/components/sections/FeatureMatch";
import FeatureProof from "@/components/sections/FeatureProof";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <FeaturePitch />
        <FeatureMatch />
        <FeatureProof />
      </main>
    </>
  );
}
