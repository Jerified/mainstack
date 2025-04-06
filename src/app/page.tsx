// import Image from "next/image";

import Hero from "@/components/Hero";
import TransactionList from "@/components/TransactionList";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto">
      <Hero />
      <TransactionList/>
    </main>
  );
}
