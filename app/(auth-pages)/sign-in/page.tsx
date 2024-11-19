"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { db } from "@/app/db";

function App() {
  const { isLoading, user, error } = db.useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        Uh oh! {error.message}
      </div>
    );
  }
  if (user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1>Hello {user.email}!</h1>
      </div>
    );
  }
  return <Login />;
}

function Login() {
  const [sentEmail, setSentEmail] = useState("");
  return (
    <div className="flex items-center justify-center h-screen">
      {!sentEmail ? (
        <Email setSentEmail={setSentEmail} />
      ) : (
        <MagicCode sentEmail={sentEmail} />
      )}
    </div>
  );
}

type EmailProps = {
  setSentEmail: (email: string) => void;
};

function Email({ setSentEmail }: EmailProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) return;
    setSentEmail(email);
    db.auth.sendMagicCode({ email }).catch((err) => {
      alert("Uh oh :" + err.body?.message);
      setSentEmail("");
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-4 h-screen"
    >
      <h2 className="text-gray-700 mb-5 text-lg font-semibold">
        Sign in or sign up with just an email.
      </h2>
      <input
        className="px-4 py-2 border border-gray-300 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Send Code
      </button>
    </form>
  );
}

type MagicCodeProps = {
  sentEmail: string;
};
function MagicCode({ sentEmail }: MagicCodeProps) {
  const [code, setCode] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let { error } = await db.auth.signInWithMagicCode({
      email: sentEmail,
      code,
    });

    if (error) {
      console.log(error);
      return;
    }
    router.push("/document");
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-4 h-screen"
    >
      <h2 className="text-gray-700 mb-5 text-lg font-semibold">
        Okay, we sent you an email! What was the code?
      </h2>
      <input
        className="px-4 py-2 border border-gray-300 rounded w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="123456..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Verify
      </button>
    </form>
  );
}

export default App;
