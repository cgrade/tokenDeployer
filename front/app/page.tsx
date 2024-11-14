"use client";
// app/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirect = () => {
      router.push("/landing");
      setLoading(false);
    };
    redirect();
  }, [router]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div> // Show loading state while redirecting
      ) : (
        <div>Redirecting...</div> // Optional: Show a message after loading
      )}
    </div>
  );
};

export default Home;
