import "@radix-ui/themes/styles.css";
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, Theme } from '@radix-ui/themes'
import NavBar from './NavBar'
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

const inter = Inter({ subsets: ['latin'], variable: "--font-inter", })

export const metadata: Metadata = {
  title: 'Mixues - Issue Tracker',
  description: 'Issue tracking app for Mixin Network and Mixin Messenger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme accentColor="violet" grayColor="slate">
          <QueryClientProvider>
            <AuthProvider>
              <NavBar />
              <main className='p-5'>
                <Container>{children}</Container>
              </main>
            </AuthProvider>
          </QueryClientProvider>
        </Theme>
      </body>
    </html>
  )
}
