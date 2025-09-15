import React from "react";

export type AvisoProps = {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonUrl?: string;
  note?: string;
  background?: string;
};

const Aviso: React.FC<AvisoProps> = ({
  title,
  subtitle,
  buttonText,
  buttonUrl,
  note,
  background = "bg-gradient-to-r from-[#0f172a] to-[#1e293b]",
}) => {
  return (
    <div className={`rounded-2xl p-8 text-center text-white ${background}`}>
      {subtitle && (
        <div className="text-yellow-300 tracking-widest mb-2 text-lg font-medium">
          {subtitle}
        </div>
      )}
      <h2 className="text-3xl font-bold mb-6">
        {title}
      </h2>
      {buttonText && buttonUrl && (
        <a
          href={buttonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-400 text-green-900 font-semibold px-8 py-3 rounded-lg text-lg mb-4 hover:bg-green-500 transition"
        >
          {buttonText}
        </a>
      )}
      {note && (
        <div className="mt-2 text-gray-200 text-base">{note}</div>
      )}
    </div>
  );
};

export default Aviso;