import Image from "next/image";
import HeaderAuth from "@/components/header-auth";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";

const defaultUrl = process.env.URL ? process.env.URL : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Y-Sweet and InstantDB Starter Kit",
  description:
    "An epic collaborative text editor powered by Y-Sweet, InstantDB and Slate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="w-full">
            <div className="flex flex-col items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                    <Link href={"/"}>Y-Sweet InstantDB Starter</Link>
                    <div className="flex items-center gap-4">
                      <Link
                        href="https://app.netlify.com/start/deploy?repository=https://github.com/jamsocket/y-sweet-instant-demo"
                        target="_blank"
                      >
                        <Image
                          alt="Deploy to Netlify"
                          width={150}
                          height={20}
                          priority
                          src="https://www.netlify.com/img/deploy/button.svg"
                        />
                      </Link>
                      <a href="https://github.com/jamsocket/y-sweet-instantdb-demo">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          width={20}
                          height={20}
                        >
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.38.6.11.82-.26.82-.58 0-.29-.01-1.24-.02-2.25-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.83 2.82 1.3 3.51.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3.01-.4c1.02.01 2.05.14 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.67 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.23 0 1.61-.01 2.92-.01 3.32 0 .32.21.69.83.58A12 12 0 0 0 24 12C24 5.37 18.63 0 12 0z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <HeaderAuth />
                </div>
              </nav>
              <div className="w-full max-w-5xl p-4 px-5">{children}</div>
              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                <p>
                  Powered by{" "}
                  <a
                    href="https://jamsocket.com/y-sweet"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Y-Sweet
                  </a>{" "}
                  &{" "}
                  <a
                    href="https://www.instantdb.com/"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    InstantDB
                  </a>{" "}
                </p>
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
