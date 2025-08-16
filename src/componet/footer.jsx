const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white z-1000 absolute bottom-0 py-4  px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
        {/* Developer Credit */}
        <p className="text-sm sm:text-base font-medium">
          Website Design & Development © 2025 Abay Tefera
        </p>

        {/* Content Copyright */}
        <p className="text-sm sm:text-base font-medium">
          Website Content © 2025 Out of the Ashes
        </p>
      </div>
    </footer>
  );
};

export default Footer;
