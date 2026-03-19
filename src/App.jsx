import { useState, useEffect } from 'react';

// Top cluster items (no text, absolute positions relative to the first 100vh screen)
const clusterItems = [
  { id: 'c1', bg: 'bg-[#d0e0e3]', w: '28vw', aspect: '16/9', top: '65vh', left: '4vw', z: 30 }, // Blue ruins (moved left & down slightly for overlap check)
  { id: 'c2', bg: 'bg-[#2a2a2a]', w: '15vw', aspect: '16/9', top: '58vh', left: '26vw', z: 40 }, // Girl hair still (moved left)
  { id: 'c3', bg: 'bg-[#1a1a1a]', w: '28vw', aspect: '4/3', top: '88vh', left: '26vw', z: 10 },  // Simulacra (moved left)
  { id: 'c4', bg: 'bg-[#000000]', w: '28vw', aspect: '16/9', top: '83vh', left: '50vw', z: 50 }, // RESPECT mac window
  { id: 'c5', bg: 'bg-[#ffffff]', w: '12vw', aspect: '3/4', top: '44vh', left: '64vw', z: 10 },  // STONE PARK (moved right)
  { id: 'c6', bg: 'bg-[#f4cccc]', w: '12vw', aspect: '3/4', top: '34vh', left: '74vw', z: 20 },  // POP-UP STORE (moved right)
  { id: 'c7', bg: 'bg-[#e0f7fa]', w: '14vw', aspect: '1/2', top: '59vh', left: '80vw', z: 60 },  // 실험적공간 (moved right)
];

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('Home.');
  const [showStickyCherry, setShowStickyCherry] = useState(false);
  const [stickyHovered, setStickyHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show if not on Home, or if scrolled past 30vh
      if (activePage !== 'Home.') {
        setShowStickyCherry(true);
      } else {
        if (window.scrollY > window.innerHeight * 0.3) {
          setShowStickyCherry(true);
        } else {
          setShowStickyCherry(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const toggleGallery = () => {
    setIsRevealed(!isRevealed);
    setIsHovered(false);
  };

  const handleStickyClick = () => {
    setActivePage('Home.');
    setIsRevealed(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setStickyHovered(false);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    // Only allow scrolling when isRevealed is true or when on another page
    <div className={`relative w-full bg-[#E9EBB7] font-sans selection:bg-[#171717] selection:text-[#E9EBB7] overflow-x-hidden ${(activePage !== 'Home.' || isRevealed) ? 'min-h-[100vh] pb-[10vh]' : 'h-screen overflow-hidden'}`}>

      {/* 1. Header is transparent */}
      {/* bg-transparent ensures it never has a solid background color */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-start px-4 md:px-6 py-3 md:py-3 z-[9999] pointer-events-none bg-transparent">
        <h1
          className="text-3xl md:text-[35px] font-bold tracking-tight text-[#171717] leading-none pointer-events-auto"
          style={{ fontFamily: '"Futura", "Trebuchet MS", sans-serif' }}
        >
          SEOYUN SHIN
        </h1>

        {/* Adjusted Hamburger Menu Icon - slightly lower, specific gap/sizing */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex flex-col gap-[5.5px] p-2 mt-11 mr-11 group pointer-events-auto transition-opacity z-[10001]"
          aria-label="Menu"
        >
          <span className={`block w-5 h-[2.5px] transition-colors duration-300 ${isMenuOpen ? 'bg-[#34A1E5]' : 'bg-[#171717] group-hover:bg-[#34A1E5]'}`}></span>
          <span className={`block w-5 h-[2.5px] transition-colors duration-300 ${isMenuOpen ? 'bg-[#34A1E5]' : 'bg-[#171717] group-hover:bg-[#34A1E5]'}`}></span>
          <span className={`block w-5 h-[2.5px] transition-colors duration-300 ${isMenuOpen ? 'bg-[#34A1E5]' : 'bg-[#171717] group-hover:bg-[#34A1E5]'}`}></span>
        </button>
      </header>

      {/* 2. Top Screen (Cherry & Cluster) - ONLY ON HOME PAGE */}
      {activePage === 'Home.' && (
        <section className="relative w-full h-screen">
          {/* The Cherry - Placed at dead center of 100vh height */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            {/* We do NOT apply transform translation when revealed, so the cherry stays perfectly still */}
            <div
              className="relative z-[100] cursor-pointer pointer-events-auto -duration-100  pb-[5vh]"
              onClick={toggleGallery}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="relative w-40 h-40 md:w-56 md:h-56 -mt-20">
                <img
                  src="/cc.png"
                  alt="Cherry Default"
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl ${!isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
                <img
                  src="/cc_cut.png"
                  alt="Cherry Cut Hover"
                  className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                />
              </div>
            </div>
          </div>

          {/* The Top Cluster (Only images, no text!) */}
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] z-10 ${isRevealed ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
          >
            {clusterItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute pointer-events-auto shadow-lg overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${item.bg}`}
                style={{
                  top: item.top,
                  left: item.left,
                  width: item.w,
                  aspectRatio: item.aspect,
                  zIndex: item.z,
                  // Simple entry animation
                  transform: isRevealed ? 'translateY(0)' : 'translateY(10vh)',
                  transitionDelay: `${index * 80}ms`
                }}
              >
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-40 text-center break-all text-[#171717]">img{index + 1}</span>
                {/* Replace with your image tags when ready, e.g. <img src="..." className="w-full h-full object-cover"/> */}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. The Scrollable Portfolio Items Below */}
      {/* 3. The Scrollable Portfolio Items Below (Only on Home Page) */}
      {activePage === 'Home.' && (
        <section
          className={`relative w-full max-w-screen-xl mx-auto flex flex-col items-center gap-16 md:gap-32 pb-32 transition-all duration-1000 ease-out 
            ${isRevealed ? 'opacity-100 translate-y-0 visible pt-10 delay-500' : 'opacity-0 translate-y-32 invisible pt-10'}
          `}
        >
          {/* Row 1: 3D Poster / Monochrome Poster */}
          <div className="w-full flex justify-between items-start px-[10vw] md:px-[15vw] mt-110">
            <div className="flex flex-col group w-[30vw] md:w-[22vw]">
              <div className="w-full aspect-[3/4] bg-[#ffccd5] mb-4 shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500 relative">
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-50 p-2 text-center text-black">src="/images/popup.jpg"</span>
              </div>
              <div className="opacity-90 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-[#171717] tracking-wider leading-snug">3D Poster / 2026.Nov</h3>
                <p className="text-xs md:text-sm text-[#171717]/80 mt-1">Jewerly brand pop-up store</p>
              </div>
            </div>

            <div className="flex flex-col group w-[30vw] md:w-[22vw] ">
              <div className="w-full aspect-[3/4] bg-[#f0f0f0] mb-4 shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500 relative">
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-50 p-2 text-center text-black">src="/images/monochrome.jpg"</span>
              </div>
              <div className="opacity-90 mt-2">
                <h3 className="text-sm md:text-base font-semibold text-[#171717] tracking-wider leading-snug">Monochrome Poster / 2025.Oct</h3>
                <p className="text-xs md:text-sm text-[#171717]/80 mt-1">Jeju stone park art exhibition</p>
              </div>
            </div>
          </div>

          {/* Row 2: Motion Poster */}
          <div className="w-full flex justify-center items-center px-[3vw] md:px-[10vw] mt-[5vh]">
            <div className="flex flex-col items-end pb-8 pr-6 md:pr-12 w-[40vw] md:w-[35vw]">
              <h3 className="text-sm md:text-base font-semibold text-[#171717] tracking-wider leading-snug text-right">Motion Poster / 2026.Dec</h3>
              <p className="text-xs md:text-sm text-[#171717]/80 mt-1 text-right">Youngpoong bookstore Campaign</p>
            </div>
            <div className="flex flex-col group w-[35vw] md:w-[25vw]">
              <div className="w-full aspect-[1/2] bg-[#e0f7fa] shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500 relative">
                <span className="absolute inset-0 flex items-center justify-center font-mono text-xs opacity-50 p-2 text-center text-black">src="/images/motion.jpg"</span>
              </div>
            </div>
          </div>

          {/* Row 3: MV Trailer */}
          <div className="w-full flex justify-start items-end px-[5vw] md:px-[8vw] mt-[10vh]">
            <div className="flex flex-col group w-[75vw] md:w-[60vw]">
              <div className="w-full aspect-[16/9] bg-[#1a1a1a] shadow-lg overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-500 relative">
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] md:text-xs opacity-60 text-white p-2 text-center">src="/images/simulacra.jpg"</span>
              </div>
            </div>
            <div className="flex flex-col pl-6 md:pl-12 pb-[1%] md:pb-[3%]">
              <h3 className="text-sm md:text-base font-semibold text-[#171717] tracking-wider leading-snug whitespace-nowrap">MV Trailer / 2026.July</h3>
              <p className="text-xs md:text-sm text-[#171717]/80 mt-1">SIMULACRA</p>
            </div>
          </div>

        </section>
      )}

      {/* New Work Overview Page (Image 1) */}
      {activePage === 'Work.' && (
        <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-32 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-center items-center md:items-start text-center gap-16 md:gap-[8vw] w-full px-10">
            {/* 1. Digital Design */}
            <div className="group cursor-pointer">
              <p
                style={{ fontFamily: '"Poltawski Nowy", serif', fontSize: '30px', color: '#000000' }}
                className="transition-opacity group-hover:opacity-50"
              >
                Digital Design
              </p>
            </div>
            {/* 2. Data Visualization */}
            <div
              className="flex flex-col items-center group cursor-pointer"
              onClick={() => {
                setActivePage('WorkList');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
            >
              <p
                style={{ fontFamily: '"Poltawski Nowy", serif', fontSize: '29px', color: '#000000' }}
                className="transition-opacity group-hover:opacity-50 leading-snug"
              >
                Data Visualization &<br />Information Design
              </p>
              <p
                style={{ fontFamily: '"Poltawski Nowy", serif', fontSize: '24px', color: '#000000' }}
                className="transition-opacity group-hover:opacity-50 mt-1"
              >
                (2026)
              </p>
            </div>
            {/* 3. Film Design */}
            <div className="group cursor-pointer">
              <p
                style={{ fontFamily: '"Poltawski Nowy", serif', fontSize: '30px', color: '#000000' }}
                className="transition-opacity group-hover:opacity-50 leading-snug"
              >
                Film Design<br />& Animation
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Work List Page - Numbers Grid (Image 2) */}
      {activePage === 'WorkList' && (
        <section className="relative w-full min-h-screen flex items-center justify-center pt-32 pb-32 animate-fade-in">
          {/* A grid of 4x4 numbers */}
          <div className="grid grid-cols-4 gap-y-20 gap-x-20 md:gap-x-40 w-max mx-auto text-center">
            {[...Array(16)].map((_, i) => {
              const num = i + 1;
              return (
                <div
                  key={num}
                  className="cursor-pointer group flex justify-center items-center"
                  onClick={() => {
                    setActivePage(`Week${num}`);
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                >
                  <span
                    className="text-[#919444] italic transition-all duration-300 group-hover:text-[#454719] group-hover:font-semibold group-hover:underline underline-offset-[12px] decoration-[#454719]"
                    style={{
                      fontFamily: '"Poltawski Nowy", serif',
                      fontSize: '48px',
                    }}
                  >
                    {num}
                  </span>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Weekly Details Page (Image 3) */}
      {activePage.startsWith('Week') && (
        <section className="relative w-full min-h-screen pt-[18vh] md:pt-[22vh] pb-32 animate-fade-in flex px-[8vw] md:px-[12vw]">
          <div className="w-full max-w-[1200px] mx-auto flex flex-col">
            <h2
              className="text-3xl md:text-[40px] font-extrabold text-[#171717] mb-[3vh] md:mb-[4vh] tracking-tight leading-none"
              style={{ fontFamily: '"Futura", "Trebuchet MS", sans-serif' }}
            >
              week.{activePage.replace('Week', '')}
            </h2>
            <div className={`w-full h-[75vh] md:h-[80vh] shadow-sm overflow-hidden flex items-center justify-center ${activePage === 'Week3' ? 'bg-[#ffffff]' : 'bg-[#dadada]'}`}>
              {activePage === 'Week3' ? (
                <iframe
                  src="/week3.pdf"
                  className="w-full h-full border-none"
                  title="Week 3 PDF"
                >
                  <p className="p-4 text-center">이 브라우저에서는 PDF를 미리 볼 수 없습니다. <a href="/week3.pdf" className="text-blue-500 underline">다운로드</a></p>
                </iframe>
              ) : (
                <p className="text-[#171717]/50 font-mono">Week {activePage.replace('Week', '')} Content Area (Placeholder)</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Profile Page Content Placeholder */}
      {activePage === 'Profile.' && (
        <section className="relative w-full min-h-screen max-w-screen-xl mx-auto flex flex-col items-center justify-center pt-32 pb-32 opacity-100 animate-fade-in">
          <div className="w-[80vw] md:w-[50vw] bg-[#ffffff] aspect-[4/3] shadow-lg flex items-center justify-center">
            <p className="text-[#171717] font-mono text-sm opacity-50">Profile / About Me (프로필 내용 채우기)</p>
          </div>
        </section>
      )}

      {/* 4. Sliding Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[25vw] bg-[#90D3FD] z-[20000] shadow-2xl transform transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          className="absolute top-10 right-10 text-[#34A1E5] hover:opacity-70 transition-opacity mr-7 py-4"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex-1 flex flex-col items-center justify-center gap-8 text-center" style={{ fontFamily: '"Futura", "Trebuchet MS", sans-serif', fontSize: '19px', fontWeight: 'bold' }}>
          {['Home.', 'Profile.', 'Work.'].map((page) => (
            <button
              key={page}
              onClick={() => handleNavClick(page)}
              className={` cursor-pointer transition-colors duration-100 tracking-wide hover:text-[#34A1E5] origin-left ${activePage === page ? 'text-[#34A1E5]' : 'text-[#ffffff]'}`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      {/* 5. Sticky Bottom Right Cherry */}
      <div
        className={`fixed bottom-[5vh] right-[4vw] z-[99999] cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 ${showStickyCherry ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-10'}`}
        onClick={handleStickyClick}
        onMouseEnter={() => setStickyHovered(true)}
        onMouseLeave={() => setStickyHovered(false)}
      >
        <div className="relative w-20 h-20 md:w-28 md:h-28">
          <img
            src="/cc.png"
            alt="Sticky Cherry Default"
            className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-300 ${!stickyHovered ? 'opacity-100' : 'opacity-0'}`}
          />
          <img
            src="/cc_cut.png"
            alt="Sticky Cherry Cut Hover"
            className={`absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-opacity duration-300 ${stickyHovered ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      </div>

    </div>
  );
}

export default App;

