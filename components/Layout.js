import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Layout({ children }) {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  alt="Logo icon with AI letters in blue and purple gradient"
                  className="mr-2"
                  height="40"
                  src="/logo.jpg"
                  width="40"
                />
                <span className="text-xl font-bold">CareerAI</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {mounted && (
                  theme === 'dark' ? (
                    <i className="fas fa-sun text-xl" />
                  ) : (
                    <i className="fas fa-moon text-xl" />
                  )
                )}
              </button>
              {session ? (
                <div className="relative">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    <img
                      src={session.user.image}
                      alt="User profile"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <i className="fas fa-user text-xl" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}
