import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function LandingPage({ isAuthenticated }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 font-sans text-gray-100">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/90 backdrop-blur-md shadow-lg shadow-purple-900/20 py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">

            <div className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300 ml-2">Jettolatte</div>
          </div>
          
          <div className="hidden lg:flex gap-8 items-center">
            <a href="#features" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full">Menu</a>
            <a href="#testimonials" className="text-gray-300 hover:text-purple-300 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full">Reviews</a>
            {isAuthenticated ? (
              <Link 
                to="/app" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-900/40 hover:shadow-lg hover:shadow-purple-900/50"
              >
                My Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md shadow-purple-900/40 hover:shadow-lg hover:shadow-purple-900/50"
                >
                  Order Now
                </Link>
              </>
            )}
          </div>
          
          <button 
            className="lg:hidden text-gray-200 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gray-900 border-t border-gray-800 animate-fadeIn">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <a href="#features" className="text-gray-300 hover:text-purple-300 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Menu</a>
              <a href="#about" className="text-gray-300 hover:text-purple-300 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
              <a href="#testimonials" className="text-gray-300 hover:text-purple-300 py-2 transition-colors" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
              {isAuthenticated ? (
                <Link 
                  to="/app" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-gray-300 hover:text-purple-300 py-2 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2 rounded-lg font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Order Now
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(120,50,255,0.15),rgba(30,20,40,0))] z-1"></div>
        <div className="absolute top-0 right-0 w-full h-full">
          <div className="absolute top-20 right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 left-20 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl"></div>
        </div>
        <img 
          src="/api/placeholder/1920/1080" 
          alt="Coffee beans background" 
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay z-0"
        />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="flex items-center mb-6">
                <span className="bg-purple-900/60 text-purple-300 px-4 py-1 rounded-full text-sm font-medium border border-purple-700/30 flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  EST. 2024
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 leading-tight text-white">
                Your Cozy Task <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400 animate-gradient">Café</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-300">
                Organize your day with the rich aroma of productivity. Jettolatte brings the coffeehouse experience to your to-do list.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                {isAuthenticated ? (
                  <Link 
                    to="/app" 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-900/40 hover:from-purple-500 hover:to-indigo-500 group"
                  >
                    Open Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <>
                    <Link 
                      to="/signup" 
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/30 hover:shadow-xl hover:shadow-purple-900/40 hover:from-purple-500 hover:to-indigo-500 group"
                    >
                      First Order Free
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                    <Link   
                      to="/tour" 
                      className="border border-purple-700/50 text-gray-200 hover:bg-purple-900/20 px-8 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm"
                    >
                      View Menu
                    </Link>
                  </>
                )}
              </div>
              
              <div className="mt-12 flex items-center gap-4 text-gray-400">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-gray-950 flex items-center justify-center overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-600 opacity-80"></div>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-purple-300 font-medium">+10k</span> users joined last month
                </div>
              </div>
            </div>
            
            <div className="relative lg:mt-0 mt-12">
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-2xl blur-md"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 backdrop-blur-sm rounded-xl"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-600/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-indigo-600/30 rounded-full blur-xl"></div>
              
              <img 
                src="src/assets/Screenshot 2025-03-11 110544.jpg" 
                alt="Jettolatte app interface" 
                className="relative rounded-xl shadow-2xl shadow-purple-900/30 w-full border border-gray-800 z-10"
              />
              
              <div className="absolute -right-6 -bottom-6 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-3 shadow-lg shadow-purple-900/50 z-20 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="py-16 bg-gray-950 border-y border-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/5 to-indigo-900/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10k+", label: "Happy customers", icon: "👥" },
              { number: "99.9%", label: "Satisfaction", icon: "⭐" },
              { number: "5M+", label: "Tasks brewed", icon: "✓" },
              { number: "24/7", label: "Always open", icon: "🕒" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800/50 transform transition-transform hover:scale-105 hover:shadow-lg hover:shadow-purple-900/20">
                <div className="text-2xl mb-3">{stat.icon}</div>
                <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">{stat.number}</p>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-40 left-20 w-72 h-72 bg-purple-900/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-60 right-20 w-80 h-80 bg-indigo-900/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 bg-gray-900 rounded-full text-purple-400 text-sm font-medium mb-4 border border-purple-900/30">Features</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Our Menu</h2>
            <p className="text-gray-300 text-lg">
              Carefully crafted productivity tools to help you organize your day with rich, full-bodied functionality
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "☕️",
                title: "Morning Brew Tasks",
                description: "Quick and intuitive task creation with smart prioritization to start your day right",
              },
              {
                icon: "🎵",
                title: "Lofi Focus Timer",
                description: "Built-in productivity timer with coffee shop ambiance sounds to help you focus",
              },
              {
                icon: "☁️",
                title: "Cloud Sync",
                description: "Seamlessly access your tasks across all your devices, always updated in real-time",
              },
              {
                icon: "📊",
                title: "Productivity Insights",
                description: "Beautiful charts and analytics to track your progress and celebrate achievements",
              },
              {
                icon: "🌙",
                title: "Night Mode",
                description: "Soothing dark theme for those late night productivity sessions at the cafe",
              },
              {
                icon: "🔔",
                title: "Gentle Reminders",
                description: "Non-intrusive notifications that keep you on track without breaking your flow",
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl transform transition-all group-hover:scale-105 group-hover:from-purple-900/30 group-hover:to-indigo-900/30 blur-md"></div>
                <div className="bg-gray-900 p-8 rounded-xl shadow-lg shadow-purple-900/10 relative border border-gray-800 backdrop-blur-sm z-10 h-full transition-all group-hover:shadow-xl group-hover:shadow-purple-900/20 group-hover:border-purple-800/40">
                  <div className="relative w-16 h-16 mb-6 rounded-lg bg-gradient-to-br from-purple-900/40 to-indigo-900/40 flex items-center justify-center">
                    <div className="text-4xl">{feature.icon}</div>
                    <div className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">{feature.title}</h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* App Screenshot */}
      <div className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(120,50,255,0.1),rgba(30,20,40,0))]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 bg-gray-800 rounded-full text-purple-400 text-sm font-medium mb-4 border border-purple-900/30">Interface</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Today's Special</h2>
            <p className="text-gray-300 text-lg">
              A rich, aromatic interface with notes of efficiency and hints of tranquility
            </p>
          </div>
          
          <div className="relative mt-20">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 transform -skew-y-3 rounded-xl blur-md"></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/20 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative pt-8 px-8">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
              
              <img 
                src="src/assets/Screenshot 2025-03-11 110544.jpg" 
                alt="Jettolatte dashboard" 
                className="rounded-lg shadow-2xl shadow-purple-900/30 mx-auto w-full max-w-5xl border border-gray-800"
              />
              
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-md shadow-purple-900/20 border border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="text-gray-400 text-sm font-mono ml-2">jettolatte.app</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div id="testimonials" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(120,50,255,0.1),rgba(30,20,40,0))]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 bg-gray-900 rounded-full text-purple-400 text-sm font-medium mb-4 border border-purple-900/30">Testimonials</div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Customer Reviews</h2>
            <p className="text-gray-300 text-lg">
              See what our regulars have to say about their Jettolatte experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Jettolatte has completely changed how I organize my day. The warm interface makes checking off tasks actually enjoyable.",
                author: "Sara K.",
                role: "Freelance Designer",
                rating: 5
              },
              {
                quote: "As someone who works from cafes, this app just feels right. It's like they bottled the productivity I feel at my favorite coffee shop.",
                author: "Michael T.",
                role: "Content Creator",
                rating: 5
              },
              {
                quote: "The focus timer with ambient sounds feature alone is worth it. I'm getting more done without feeling stressed. And it's free!",
                author: "Jamie L.",
                role: "Student",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20 rounded-xl transform transition-all group-hover:scale-105 group-hover:from-purple-900/30 group-hover:to-indigo-900/30 blur-md"></div>
                <div className="bg-gray-900 p-8 rounded-xl shadow-lg shadow-purple-900/10 border border-gray-800 relative backdrop-blur-sm z-10 h-full transition-all group-hover:shadow-xl group-hover:shadow-purple-900/20 group-hover:border-purple-800/40">
                  <div className="flex mb-6">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-gray-300 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center mt-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                    <div className="ml-4">
                      <p className="font-medium text-white">{testimonial.author}</p>
                      <p className="text-purple-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      
 {/* Improved Footer */}
 <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">Jettolatte</div>
              </div>
              <p className="text-gray-400 text-sm">Organize your tasks efficiently with our beautiful and intuitive task management application.</p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-3">Stay Connected</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                © {new Date().getFullYear()} Jettolatte. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;