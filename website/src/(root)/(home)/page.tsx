import React, { useEffect, useState } from "react";
import Navbar from "../../components_i/ui/Navbar";
import PropertyListing from "components_i/ui/PropertyListing";
import Footer from "components_i/ui/Footer";
import Beneficit from "components_i/ui/Beneficit";
import HeroSection from "components_i/ui/HeroSection";

const SuccessMessage = ({ message }: { message: string | null }) => {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "20px",
        backgroundColor: "#0053f8",
        fontWeight: "bold",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {message}
    </div>
  );
};

const LandingPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const successMessage = sessionStorage.getItem("message");
    if (successMessage) {
      setMessage(successMessage);
      sessionStorage.removeItem("message");

      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  }, []);

  const handleSubscribe = () => {
    if (!email.trim() || !email.includes("@")) {
      alert("Por favor, insira um e-mail válido!");
      return;
    }

    // Prepare CSV data
    const csvData = `Email,Data\n${email},${new Date().toLocaleString()}`;
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvBlob);

    // Create download link
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "subscribers.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMessage("Inscrição salva com sucesso!");
    setEmail(""); // Clear input field
  };

  return (
    <>
      <Navbar />
      <style>{`
        body {
          overflow-x: hidden;
        }
      `}</style>
      <div className="flex min-h-screen flex-col items-center overflow-x-hidden">
        <HeroSection />
        <Beneficit />

        {/* Property Listing Section */}
        <div className="w-full bg-gradient-to-b from-white to-[#e7ecfd] px-4 lg:px-0">
          <PropertyListing />
        </div>

        {/* Subscription Section */}
        <div className="w-full bg-[#02166c] py-10 flex justify-center px-4">
          <div className="flex flex-col items-center w-full lg:w-[80%] xl:w-[1440px]">
            <h4 className="text-[#A0A3BD] text-[14px] lg:text-[16px] mb-2">
              Promessa de Não Enviar Spam
            </h4>
            <h2 className="text-white text-2xl lg:text-[32px] font-bold mb-4">
              Você é um locador?
            </h2>
            <p className="text-[#A0A3BD] mb-6 text-center text-sm lg:text-base">
              Descubra maneiras de aumentar o valor da sua propriedade e seja
              listado. Sem Spam.
            </p>

            {/* Email Subscription */}
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-lg shadow-lg w-full sm:w-[400px] lg:w-[543px] p-4 sm:p-0 h-auto sm:h-[80px]">
              <input
                type="email"
                placeholder="Insira seu endereço de e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 sm:h-full pl-4 outline-none rounded-lg text-[#100A55] mb-2 sm:mb-0"
              />
              <button
                onClick={handleSubscribe}
                className="inline-flex items-center justify-center whitespace-nowrap w-full sm:w-auto rounded-lg mt-2 sm:mt-0 sm:ml-2 sm:mr-4 px-4 py-2 bg-blue-500 text-white"
              >
                Inscrever-se
              </button>
            </div>

            <p className="text-[#A0A3BD] mt-4 text-center">
              Junte-se a mais de 10.000+ outros locadores na nossa comunidade.
            </p>
          </div>
        </div>
        <Footer />
      </div>

      <SuccessMessage message={message} />
    </>
  );
};

export default LandingPage;