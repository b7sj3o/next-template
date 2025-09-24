import Script from "next/script";
// import { Inter, Unbounded } from 'next/font/google'
import { ThemeProvider } from "next-themes"

import { Toaster } from 'sonner'
import { NextIntlClientProvider } from 'next-intl';
import { Analytics } from "@vercel/analytics/next"

import Header from "@/components/header";
import Menu from "@/components/menu";
// import SubmitForm from "@/components/modals/submit-modal";
import Footer from "@/components/footer";
// import Icons from "@/components/socials";
import { StoreProvider } from "@/providers/store-provider";
import { MuiProvider } from "@/providers/mui-provider";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/providers/auth-provider";
// import Drawers from "@/utils/drawers";
import "./globals.css";

export const metadata = {
  title: "",
  description: "",
  icons: {
    icon: "/favicon.ico"
  },
}

// const inter = Inter({
//   subsets: ['latin', 'cyrillic'], 
//   variable: '--font-inter',
//   weight: '400'
// })

// const unbounded = Unbounded({ 
//   subsets: ['latin', 'cyrillic'],
//   variable: '--font-unbounded',
//   display: 'swap',
// });

export default async function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang='ua' suppressHydrationWarning>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {/* GOOGLE TAG MANAGER HERE */}
        </Script>

        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body className={``}>  
        {/* GOOGLE TAG MANAGER HERE */}

        <QueryProvider>
          <StoreProvider>
            <AuthProvider>
              <ThemeProvider attribute="class" defaultTheme="light">
                <div className="wrapper min-h-screen bg-background text-foreground">
                  <div className="content">
                    {/* <Icons/> */}

                    {/* <Drawers/> */}
                    <Toaster position="bottom-right"/>
                                
                    <Menu />
                    <Header />

                    <MuiProvider>
                      <NextIntlClientProvider>{children}</NextIntlClientProvider>
                      <Analytics/>
                    </MuiProvider>
                  </div>
                    
                  <Footer />
                </div>
              </ThemeProvider>
            </AuthProvider>
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
